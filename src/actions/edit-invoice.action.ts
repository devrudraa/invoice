"use server";
import { formatCurrency } from "@/lib/utils";
import {
  InvoiceFormSchemaType,
  invoiceSchema,
} from "@/schema/invoice-schema.zod";
import { db } from "@/utils/db.dirzzle";
import { getSession } from "@/utils/hooks/use-session.hook";
import { resend } from "@/utils/resend-send";
import { invoices } from "@drizzle/schema.drizzle";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import EzyInvoiceInvoice from "../../emails/invoice-receipt";
import { ActionReturnType } from "./action.types";

export async function editInvoiceAction(
  formData: InvoiceFormSchemaType,
  id: string
): Promise<ActionReturnType> {
  const session = await getSession();

  if (!session.user) {
    redirect("/login");
  }

  const {
    success,
    data: parsed_data,
    error,
  } = invoiceSchema.safeParse(formData);

  if (success !== true) {
    return {
      type: "error",
      errors: error.flatten().fieldErrors,
    };
  }

  const totalAmount =
    (Number(parsed_data.invoiceItemQuantity) || 0) *
    (Number(parsed_data.invoiceItemRate) || 0);

  try {
    // Find the old invoice
    const oldInvoice = await db
      .select()
      .from(invoices)
      .where(
        and(
          eq(invoices.id, id),
          eq(invoices.userId, session.userId),
          eq(invoices.status, "PENDING")
        )
      )
      .limit(1);

    if (!oldInvoice || oldInvoice.length === 0) {
      return {
        type: "Custom-Error",
        error: "No Invoice found! or Invoice is marked as paid!",
      };
    }

    // Update the invoice
    const updated = await db
      .update(invoices)
      .set({
        invoiceName: parsed_data.invoiceName,
        invoiceNumber: Number(parsed_data.invoiceNumber) || 0,
        dueDate: parsed_data.dueDate,
        date: parsed_data.date,
        invoiceItemRate: Number(parsed_data.invoiceItemRate) || 0,
        invoiceItemQuantity: Number(parsed_data.invoiceItemQuantity) || 0,
        invoiceItemDescription: parsed_data.invoiceItemDescription,
        invoiceItemTotal: totalAmount,
        note: parsed_data.note,
        fromAddress: parsed_data.fromName,
        fromEmail: parsed_data.fromEmail,
        fromName: parsed_data.fromName,
        clientAddress: parsed_data.clientAddress,
        clientEmail: parsed_data.clientEmail,
        clientName: parsed_data.clientName,
        status: parsed_data.status,
        currency: parsed_data.currency,
        userId: session.user.id,
      })
      .where(
        and(
          eq(invoices.id, id),
          eq(invoices.userId, session.userId),
          eq(invoices.status, "PENDING")
        )
      )
      .returning();

    const dbData = updated[0];

    const email = await resend.emails.send({
      from: `${parsed_data.fromName} <invoice@rudracode.com>`,
      to: [parsed_data.clientEmail],
      subject: `Invoice for ${parsed_data.clientName}`,
      react: EzyInvoiceInvoice({
        invoiceDueDate: new Intl.DateTimeFormat("en-IN", {
          dateStyle: "long",
        }).format(parsed_data.date),
        invoiceNumber: parsed_data.invoiceNumber,
        userFirstName: parsed_data.clientName,
        totalAmount: formatCurrency({
          amount: totalAmount,
          currency: parsed_data.currency,
        }),
        fromName: parsed_data.fromName,
        baseUrl: process.env.NEXT_PUBLIC_URL,
        invoiceName: parsed_data.invoiceName,
        invoiceUrl: process.env.NEXT_PUBLIC_URL + `/api/invoice/${dbData.id}`,
        type: "update",
      }),
      // Only works in prod
      // TODO:
      // attachments: [
      //   {
      //     path: `${process.env.NEXT_PUBLIC_URL}/api/invoice/${invoiceId}`,
      //     filename: "invoice.pdf",
      //   },
      // ],
    });

    if (email.error) {
      await db.delete(invoices).where(eq(invoices.id, dbData.id));
      throw new Error();
    }

    return { type: "success", message: "Invoice edited successfully!" };
  } catch (error) {
    console.log("Error while editing invoice", error);
    return { type: "Custom-Error", error: "Error while editing invoice" };
  }
}

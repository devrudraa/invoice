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
import { eq } from "drizzle-orm"; // if needed for queries
import { redirect } from "next/navigation";
import EzyInvoiceInvoice from "../../emails/invoice-receipt";
import { ActionReturnType } from "./action.types";

export async function createInvoiceAction(
  formData: InvoiceFormSchemaType
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
    // Insert invoice using drizzle
    const [insertedInvoice] = await db
      .insert(invoices)
      .values({
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
        userId: session.userId,
      })
      .returning();

    const invoiceId = insertedInvoice?.id;

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
        invoiceUrl: process.env.NEXT_PUBLIC_URL + `/api/invoice/${invoiceId}`,
      }),
      // Conditionally include the attachment only in production
      ...(process.env.NODE_ENV === "production" && {
        attachments: [
          {
            path: `${process.env.NEXT_PUBLIC_URL}/api/invoice/${invoiceId}`,
            filename: `${parsed_data.invoiceName}-invoice.pdf`,
          },
        ],
      }),
    });

    if (email.error && invoiceId) {
      // Delete invoice if email fails
      console.log(email.error);
      await db.delete(invoices).where(eq(invoices.id, invoiceId));
      throw new Error();
    }

    return { type: "success", message: "Invoice created successfully!" };
  } catch (error) {
    console.log("Error while creating invoice", error);
    return { type: "Custom-Error", error: "Error while creating invoice" };
  }
}

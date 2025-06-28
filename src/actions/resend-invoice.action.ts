"use server";
import { formatCurrency } from "@/lib/utils";
import { db } from "@/utils/db.dirzzle";
import { getSession } from "@/utils/hooks/use-session.hook";
import { resend } from "@/utils/resend-send";
import { invoices } from "@drizzle/schema.drizzle"; // import other tables as needed
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import EzyInvoiceInvoice from "../../emails/invoice-receipt";
import { ActionReturnType } from "./action.types";

export async function resendInvoiceAction(
  id: string
): Promise<ActionReturnType> {
  const session = await getSession();
  if (!session.user) {
    redirect("/login");
  }

  try {
    const invoiceData = await db
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

    const db_data = invoiceData[0];

    if (!db_data) {
      return { type: "Custom-Error", error: "Error no invoice found!" };
    }
    const totalAmount =
      (Number(db_data.invoiceItemQuantity) || 0) *
      (Number(db_data.invoiceItemRate) || 0);

    const email = await resend.emails.send({
      from: ` ${db_data.fromName} <invoice@rudracode.com>`,
      to: [db_data.clientEmail],
      subject: `Invoice reminder for ${db_data.clientName}`,
      react: EzyInvoiceInvoice({
        invoiceDueDate: new Intl.DateTimeFormat("en-IN", {
          dateStyle: "long",
        }).format(db_data.date),
        invoiceNumber: String(db_data.invoiceNumber),
        userFirstName: db_data.clientName,
        totalAmount: formatCurrency({
          amount: totalAmount,
          currency: db_data.currency,
        }),
        fromName: db_data.fromName,
        baseUrl: process.env.NEXT_PUBLIC_URL,
        invoiceName: db_data.invoiceName,
        invoiceUrl: process.env.NEXT_PUBLIC_URL + `/api/invoice/${db_data.id}`,
        type: "reminder",
      }),
      // Only works in prod
      // TODO:
      // attachments: [
      //   {
      //     path: `${process.env.NEXT_PUBLIC_URL}/api/invoice/${db_data.id}`,
      //     filename: "invoice.pdf",
      //   },
      // ],
    });

    if (email.error) {
      return { type: "Custom-Error", error: "Error while resending invoice!" };
    }

    return { type: "success", message: "Reminder sent successfully!" };
  } catch (error) {
    console.log("Error while creating invoice", error);
    return { type: "Custom-Error", error: "Error while sending reminder!" };
  }
}

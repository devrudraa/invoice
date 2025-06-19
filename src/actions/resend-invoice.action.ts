"use server";
import { formatCurrency } from "@/lib/utils";
import prisma from "@/utils/db.prisma";
import { getSession } from "@/utils/hooks/use-session.hook";
import { resend } from "@/utils/resend-send";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { ReminderInvoiceTemplate } from "../../email-template/reminder-invoice-template";
import { ActionReturnType } from "./action.types";

export async function resendInvoiceAction(
  id: string
): Promise<ActionReturnType> {
  const session = await getSession();
  if (!session.user) {
    redirect("/login");
  }

  try {
    const prisma_data = await prisma.invoice.findUnique({
      where: {
        id: id,
        userId: session.user.id,
        status: "PENDING",
      },
    });

    if (!prisma_data) {
      return { type: "Custom-Error", error: "Error no invoice found!" };
    }

    const email = await resend.emails.send({
      from: ` ${prisma_data.fromName} <invoice@rudracode.com>`,
      to: [prisma_data.clientEmail],
      subject: `Invoice reminder for ${prisma_data.clientName}`,
      react: ReminderInvoiceTemplate({
        invoiceId: prisma_data.id,
        invoiceDueDate: new Intl.DateTimeFormat("en-IN", {
          dateStyle: "long",
        }).format(prisma_data.date),
        invoiceNumber: String(prisma_data.invoiceNumber),
        name: prisma_data.clientName,
        totalAmount: formatCurrency({
          amount: prisma_data.invoiceItemTotal,
          currency: prisma_data.currency,
        }),
      }) as ReactNode,
      // Only works in prod
      // TODO:
      // attachments: [
      //   {
      //     path: `${process.env.NEXT_PUBLIC_URL}/api/invoice/${prisma_data.id}`,
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

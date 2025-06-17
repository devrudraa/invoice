"use server";
import {
  InvoiceFormSchemaType,
  invoiceSchema,
} from "@/schema/invoice-schema.zod";
import prisma from "@/utils/db.prisma";
import { getSession } from "@/utils/hooks/use-session.hook";
import { resend } from "@/utils/resend-send";
import { redirect } from "next/navigation";
import { InvoiceTemplate } from "../../email-template/invoice-template";
import { formatCurrency } from "@/lib/utils";
import { ReactNode } from "react";

interface ErrorType {
  type: "error";
  errors: Record<string, string[]>;
}

interface SuccessType {
  type: "success";
  message: string;
}
interface CustomErrorType {
  type: "Custom-Error";
  error: string;
}

type ReturnType = ErrorType | SuccessType | CustomErrorType;

export async function createInvoiceAction(
  formData: InvoiceFormSchemaType
): Promise<ReturnType> {
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
    const prismaData = await prisma.invoice.create({
      data: {
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
      },
    });

    await resend.emails.send({
      from: ` ${parsed_data.fromName} <invoice@rudracode.com>`,
      to: [parsed_data.clientEmail],
      subject: `Invoice for ${parsed_data.clientName}`,
      react: InvoiceTemplate({
        invoiceId: prismaData.id,
        invoiceDueDate: new Intl.DateTimeFormat("en-IN", {
          dateStyle: "long",
        }).format(parsed_data.date),
        invoiceNumber: parsed_data.invoiceNumber,
        name: parsed_data.clientName,
        totalAmount: formatCurrency({
          amount: totalAmount,
          currency: parsed_data.currency,
        }),
      }) as ReactNode,
    });

    // Simulate a successful response
    return { type: "success", message: "Invoice created successfully!" };
  } catch (error) {
    console.log("Error while creating invoice", error);
    return { type: "Custom-Error", error: "Error while creating invoice" };
  }
}

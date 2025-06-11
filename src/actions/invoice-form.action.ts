"use server";
import { formatCurrency } from "@/lib/utils";
import {
  InvoiceFormSchemaType,
  invoiceSchema,
} from "@/schema/invoice-schema.zod";
import prisma from "@/utils/db.prisma";
import { checkSession } from "@/utils/hooks/use-session.hook";
import { redirect } from "next/navigation";

interface ErrorType {
  type: "error";
  errors: Record<string, string[]>;
}

interface SuccessType {
  type: "success";
  message: string;
}

type ReturnType = ErrorType | SuccessType;

export async function createInvoiceAction(
  formData: InvoiceFormSchemaType
): Promise<ReturnType> {
  const session = await checkSession();

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
  const totalCurrency = formatCurrency({
    amount: totalAmount,
    currency: parsed_data.currency,
  });

  const data = await prisma.invoice.create({
    data: {
      invoiceName: parsed_data.invoiceName,
      invoiceNumber: parsed_data.invoiceNumber,

      dueDate: parsed_data.dueDate,
      date: parsed_data.date,

      invoiceItemRate: parsed_data.invoiceItemRate,
      invoiceItemQuantity: parsed_data.invoiceItemQuantity,
      invoiceItemDescription: parsed_data.invoiceItemDescription,
      invoiceItemTotal: totalCurrency,
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

  console.log(data);

  // Simulate a successful response
  return { type: "success", message: "Invoice created successfully!" };
}

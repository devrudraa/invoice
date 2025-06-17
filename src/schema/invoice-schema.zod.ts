import { Currency } from "@/lib/utils";
import { z } from "zod";

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice Name is required"),
  currency: z.enum(Currency).default("INR"),

  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.date({ message: "Date is required" }),
  dueDate: z.string().min(1, "Due Date is required"),

  fromName: z.string().min(1, "Your name is required"),
  fromEmail: z.string().email("Invalid Email address"),
  fromAddress: z.string().min(1, "Your address is required"),

  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid Email address"),
  clientAddress: z.string().min(1, "Client address is required"),

  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceItemDescription: z.string().min(1, "Description is required"),
  invoiceItemQuantity: z.string().min(1, "Quantity min 1"),
  invoiceItemRate: z.string().min(1, "Rate min 1"),

  note: z.string().optional(),
});

type schemaType = z.infer<typeof invoiceSchema>;

export interface InvoiceFormSchemaType extends schemaType {
  total: number | null;
}

import { formatCurrency } from "@/lib/utils";
import { db } from "@/utils/db.dirzzle";
import jsPDF from "jspdf";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await params;

  const invoice = await db.query.invoices.findFirst({
    where: (fields, { eq }) => eq(fields.id, invoiceId),
  });

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.setFont("helvetica");

  //set header
  pdf.setFontSize(24);
  pdf.text(invoice.invoiceName, 20, 20);

  // From Section
  pdf.setFontSize(12);
  pdf.text("From", 20, 40);
  pdf.setFontSize(10);
  pdf.text([invoice.fromName, invoice.fromEmail, invoice.fromAddress], 20, 45);

  // Client Section
  pdf.setFontSize(12);
  pdf.text("Bill to", 20, 70);
  pdf.setFontSize(10);
  pdf.text(
    [invoice.clientName, invoice.clientEmail, invoice.clientAddress],
    20,
    75
  );

  // Invoice details
  pdf.setFontSize(10);
  pdf.text(`Invoice Number: INV-${invoice.invoiceNumber}`, 120, 40);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(invoice.date)}`,
    120,
    45
  );
  pdf.text(`Due Date: Net ${invoice.dueDate}`, 120, 50);

  // Item table header
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 20, 100);
  pdf.text("Quantity", 100, 100);
  pdf.text("Rate", 130, 100);
  pdf.text("Total", 160, 100);

  // draw header line
  pdf.line(20, 102, 190, 102);

  // Item Details
  pdf.setFont("helvetica", "normal");
  pdf.text(invoice.invoiceItemDescription, 20, 110);
  pdf.text(invoice.invoiceItemQuantity.toString(), 100, 110);
  pdf.text(
    formatCurrency({
      amount: invoice.invoiceItemRate,
      currency: invoice.currency,
    }),
    130,
    110
  );
  pdf.text(
    formatCurrency({
      amount: invoice.invoiceItemTotal,
      currency: invoice.currency,
    }),
    160,
    110
  );

  // Total Section
  pdf.line(20, 115, 190, 115);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Total (${invoice.currency})`, 130, 130);
  pdf.text(
    formatCurrency({
      amount: invoice.invoiceItemTotal,
      currency: invoice.currency,
    }),
    160,
    130
  );

  //Additional Note
  if (invoice.note) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Note:", 20, 150);
    pdf.text(invoice.note, 20, 155);
  }

  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}

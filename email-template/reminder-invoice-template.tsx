import Head from "next/head";
import React, { ReactNode } from "react";

interface InvoiceTemplate {
  invoiceNumber: string;
  invoiceDueDate: string;
  totalAmount: string;
  name: string;
  invoiceId: string;
}

export const ReminderInvoiceTemplate: React.FC<Readonly<InvoiceTemplate>> = ({
  invoiceDueDate,
  invoiceNumber,
  name,
  totalAmount,
  invoiceId,
}): ReactNode => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Payment Reminder – Invoice #{invoiceNumber}</title>
      </Head>

      <div
        className="container"
        style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
      >
        <div style={{ padding: "30px 0" }}>
          <h2 style={{ fontSize: "2em" }}>Friendly Payment Reminder</h2>

          <p>Hi {name},</p>

          <p>
            This is a kind reminder that your invoice{" "}
            <strong>INV-{invoiceNumber}</strong> is currently due. We’d
            appreciate it if you could take a moment to complete the payment at
            your earliest convenience.
          </p>

          <div>
            <p style={{ fontWeight: "bold" }}>Invoice Summary:</p>
            <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
              <li>
                <strong>Invoice Number:</strong> INV-{invoiceNumber}
              </li>
              <li>
                <strong>Due Date:</strong> {invoiceDueDate}
              </li>
              <li>
                <strong>Total Amount:</strong> {totalAmount}
              </li>
            </ul>
          </div>

          <p>You can view and download your invoice using the button below:</p>

          <a
            href={`${process.env.NEXT_PUBLIC_URL}/api/invoice/${invoiceId}`}
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#0066cc",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              margin: "20px 0",
            }}
          >
            View Invoice
          </a>

          <p>
            If you&apos;ve already made the payment, please ignore this message.
            Otherwise, we kindly request your attention to this matter.
          </p>

          <footer
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              fontSize: "12px",
              color: "#666666",
            }}
          >
            <p>If you have any questions, feel free to contact us.</p>
            <p>
              Thank you for your prompt attention and continued partnership!
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

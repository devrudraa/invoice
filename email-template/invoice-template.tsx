import Head from "next/head";
import React, { ReactNode } from "react";

interface InvoiceTemplate {
  invoiceNumber: string;
  invoiceDueDate: string;
  totalAmount: string;
  name: string;
  invoiceId: string;
}

export const InvoiceTemplate: React.FC<Readonly<InvoiceTemplate>> = ({
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
        <title>Invoice</title>
      </Head>

      <div
        className="container"
        style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
      >
        <div style={{ padding: "30px 0" }}>
          <h2 style={{ fontSize: "2em" }}>Invoice for {name}</h2>

          <p>Dear User Whats up {name},</p>

          <p>
            I hope this email finds you well. Please find attached your invoice
            attached below
          </p>

          <div>
            <p style={{ fontWeight: "bold" }}>Invoice Details:</p>
            <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
              <li>Invoice Number: INV-{invoiceNumber}</li>
              <li>Due Date: {invoiceDueDate}</li>
              <li>Total Amount: {totalAmount}</li>
            </ul>
          </div>

          <p>You can download your invoice by clicking the button below:</p>

          <a
            href={process.env.NEXT_PUBLIC_URL + `/api/invoice/${invoiceId}`}
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
            Download Invoice
          </a>

          <footer
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              fontSize: "12px",
              color: "#666666",
            }}
          >
            <p>
              If you have any questions or concerns, please don&apos;t hesitate
              to contact us.
            </p>

            <p>Thank you for your business!</p>
          </footer>
        </div>
      </div>
    </>
  );
};

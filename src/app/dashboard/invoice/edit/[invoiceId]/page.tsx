import EditInvoice from "@/components/page/dashboard/invoices/edit/edit-invoice";
import prisma from "@/utils/db.prisma";
import { getSession } from "@/utils/hooks/use-session.hook";
import { notFound } from "next/navigation";
import React from "react";

interface Page {
  params: Promise<{
    invoiceId: string;
  }>;
}

export default async function Page({ params }: Page) {
  const { invoiceId } = await params;

  const session = await getSession();
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: session.userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return <EditInvoice data={data} />;
}

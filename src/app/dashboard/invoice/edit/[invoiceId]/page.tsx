import EditInvoice from "@/components/page/dashboard/invoices/edit/edit-invoice";
import { getSession } from "@/utils/hooks/use-session.hook";
import { notFound } from "next/navigation";
import React from "react";

import { db } from "@/utils/db.dirzzle";
import { invoices } from "@drizzle/schema.drizzle";
import { eq, and } from "drizzle-orm";

interface Page {
  params: Promise<{
    invoiceId: string;
  }>;
}

export default async function Page({ params }: Page) {
  const { invoiceId } = await params;
  const session = await getSession();

  const data = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, session.userId)))
    .then((rows) => rows[0]);

  if (!data) {
    return notFound();
  }

  return <EditInvoice data={data} />;
}

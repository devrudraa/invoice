import { db } from "@/utils/db.dirzzle";
import { invoices } from "@drizzle/schema.drizzle";
import { getSession } from "@/utils/hooks/use-session.hook";
import { desc, eq } from "drizzle-orm";

export async function getInvoices() {
  const session = await getSession();
  if (!session.user?.id) return [];

  const data = await db
    .select({
      id: invoices.id,
      clientName: invoices.clientName,
      invoiceItemTotal: invoices.invoiceItemTotal,
      createdAt: invoices.createdAt,
      status: invoices.status,
      invoiceNumber: invoices.invoiceNumber,
      currency: invoices.currency,
    })
    .from(invoices)
    .where(eq(invoices.userId, session.user.id))
    .orderBy(desc(invoices.createdAt));

  return data;
}

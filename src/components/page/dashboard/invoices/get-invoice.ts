import { db } from "@/utils/db.dirzzle";
import { getSession } from "@/utils/hooks/use-session.hook";
import { invoices } from "@drizzle/schema.drizzle";
import { eq } from "drizzle-orm";

export async function getInvoices() {
  const session = await getSession();
  if (!session.user?.id) return [];

  const data = await db.query.invoices.findMany({
    where: eq(invoices.userId, session.userId),
    orderBy: (invoices, { desc }) => [desc(invoices.createdAt)],
  });

  return data;
}

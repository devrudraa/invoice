"use server";
import { ratesToUSD } from "@/lib/utils";
import { db } from "@/utils/db.dirzzle";
import { invoices } from "@drizzle/schema.drizzle";
import { getSession } from "@/utils/hooks/use-session.hook";
import { eq, and, gte, lte, desc } from "drizzle-orm";

async function getInvoiceData(id: string) {
  // Get all invoices for user
  const totalRevenue = await db
    .select({
      invoiceItemTotal: invoices.invoiceItemTotal,
      currency: invoices.currency,
    })
    .from(invoices)
    .where(eq(invoices.userId, id));

  // Get pending invoices
  const pendingInvoices = await db
    .select({ id: invoices.id })
    .from(invoices)
    .where(and(eq(invoices.userId, id), eq(invoices.status, "PENDING")));

  // Get paid invoices
  const paidInvoices = await db
    .select({ id: invoices.id })
    .from(invoices)
    .where(and(eq(invoices.userId, id), eq(invoices.status, "PAID")));

  return {
    totalRevenue,
    pendingInvoices,
    paidInvoices,
  };
}

async function getInvoiceGraphData(id: string) {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const data = await db
    .select({
      createdAt: invoices.createdAt,
      invoiceItemTotal: invoices.invoiceItemTotal,
      currency: invoices.currency,
    })
    .from(invoices)
    .where(
      and(
        eq(invoices.userId, id),
        eq(invoices.status, "PAID"),
        gte(invoices.createdAt, thirtyDaysAgo),
        lte(invoices.createdAt, now)
      )
    )
    .orderBy(invoices.createdAt);

  return (
    Object.values(
      data.reduce(
        (
          acc: Record<
            string,
            { date: string; amount: number; timestamp: number }
          >,
          curr
        ) => {
          const dateObj = new Date(curr.createdAt);

          // Format date as "Jun 17" using Indian locale
          const label = dateObj.toLocaleString("en-IN", {
            month: "short",
            day: "numeric",
          });

          // Convert amount to USD using exchange rate
          const rate = ratesToUSD[curr.currency] ?? 0;
          const amountInUSD = curr.invoiceItemTotal * rate;

          // If this date label hasn't been added yet, initialize it
          if (!acc[label]) {
            acc[label] = {
              date: label,
              amount: amountInUSD,
              // Generate a timestamp used for accurate sorting
              timestamp: new Date(
                `${label}, ${new Date().getFullYear()}`
              ).getTime(),
            };
          } else {
            // If the date already exists, accumulate the amount
            acc[label].amount += amountInUSD;
          }

          return acc;
        },
        {}
      )
    )
      // Sort entries by actual date (not just label order)
      .sort((a, b) => a.timestamp - b.timestamp)
      // Final format expected by chart: only date and amount
      .map(({ date, amount }) => ({ date, amount: Number(amount.toFixed(2)) }))
  );
}

// Recent Data
async function getRecentInvoice(id: string) {
  return await db
    .select({
      id: invoices.id,
      clientName: invoices.clientName,
      clientEmail: invoices.clientEmail,
      invoiceItemTotal: invoices.invoiceItemTotal,
      createdAt: invoices.createdAt,
      currency: invoices.currency,
    })
    .from(invoices)
    .where(eq(invoices.userId, id))
    .orderBy(desc(invoices.createdAt))
    .limit(10);
}

export async function useDashboardBlocks() {
  const session = await getSession();
  const summaryData = await getInvoiceData(session.userId);
  const graphData = await getInvoiceGraphData(session.userId);
  const recentData = await getRecentInvoice(session.userId);

  return { summaryData, graphData, recentData };
}

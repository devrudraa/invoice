"use server";
import { ratesToUSD } from "@/lib/utils";
import prisma from "@/utils/db.prisma";
import { getSession } from "@/utils/hooks/use-session.hook";

async function getInvoiceData(id: string) {
  const [totalRevenue, pendingInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: id,
      },
      select: {
        invoiceItemTotal: true,
        currency: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: id,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: id,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    totalRevenue,
    pendingInvoices,
    paidInvoices,
  };
}

async function getInvoiceGraphData(id: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: id,
      status: "PAID",
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      invoiceItemTotal: true,
      currency: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

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
  return await prisma.invoice.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      invoiceItemTotal: true,
      createdAt: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
}

export async function useDashboardBlocks() {
  const session = await getSession();
  const summaryData = await getInvoiceData(session.userId);
  const graphData = await getInvoiceGraphData(session.userId);
  const recentData = await getRecentInvoice(session.userId);

  return { summaryData, graphData, recentData };
}

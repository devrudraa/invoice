import prisma from "@/utils/db.prisma";
import { getSession } from "@/utils/hooks/use-session.hook";

export async function getInvoices() {
  const session = await getSession();
  const data = await prisma.invoice.findMany({
    where: {
      userId: session.user?.id,
    },
    select: {
      id: true,
      clientName: true,
      invoiceItemTotal: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

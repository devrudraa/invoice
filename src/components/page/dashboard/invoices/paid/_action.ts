"use server";
import { ActionReturnType } from "@/actions/action.types";
import prisma from "@/utils/db.prisma";
import { getSession } from "@/utils/hooks/use-session.hook";

export async function _action(id: string): Promise<ActionReturnType> {
  const session = await getSession();

  try {
    await prisma.invoice.update({
      where: {
        id: id,
        userId: session.user?.id,
      },
      data: {
        status: "PAID",
      },
    });
    return { type: "success", message: "Invoice marked as paid" };
  } catch (error) {
    console.log("Delete marking as paid", error);
    return { type: "Custom-Error", error: "Something went wrong" };
  }
}

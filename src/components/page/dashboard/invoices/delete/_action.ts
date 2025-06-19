"use server";
import { ActionReturnType } from "@/actions/action.types";
import prisma from "@/utils/db.prisma";
import { getSession } from "@/utils/hooks/use-session.hook";

export async function _action(id: string): Promise<ActionReturnType> {
  const session = await getSession();

  try {
    await prisma.invoice.delete({
      where: {
        id: id,
        userId: session.user?.id,
      },
    });
    return { type: "success", message: "Invoice deleted successfully" };
  } catch (error) {
    console.log("Delete error", error);
    return { type: "Custom-Error", error: "Error while deleting data" };
  }
}

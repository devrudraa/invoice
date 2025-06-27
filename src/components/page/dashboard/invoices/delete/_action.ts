"use server";
import { ActionReturnType } from "@/actions/action.types";
import { db } from "@/utils/db.dirzzle";
import { invoices } from "@drizzle/schema.drizzle";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/utils/hooks/use-session.hook";

export async function _action(id: string): Promise<ActionReturnType> {
  const session = await getSession();

  try {
    await db
      .delete(invoices)
      .where(and(eq(invoices.id, id), eq(invoices.userId, session.userId)));
    return { type: "success", message: "Invoice deleted successfully" };
  } catch (error) {
    console.log("Delete error", error);
    return { type: "Custom-Error", error: "Error while deleting data" };
  }
}

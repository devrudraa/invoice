"use server";
import { ActionReturnType } from "@/actions/action.types";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/utils/hooks/use-session.hook";
import { db } from "@/utils/db.dirzzle";
import { invoices } from "../../../../../../drizzle/schema.drizzle";

export async function _action(id: string): Promise<ActionReturnType> {
  const session = await getSession();

  try {
    const result = await db
      .update(invoices)
      .set({ status: "PAID" })
      .where(and(eq(invoices.id, id), eq(invoices.userId, session.userId)));

    if (result.rowsAffected === 0) {
      return {
        type: "Custom-Error",
        error: "Invoice not found or not authorized",
      };
    }

    return { type: "success", message: "Invoice marked as paid" };
  } catch (error) {
    console.log("Error marking as paid", error);
    return { type: "Custom-Error", error: "Something went wrong" };
  }
}

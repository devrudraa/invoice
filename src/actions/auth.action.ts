"use server";
import { LoginSchemaType } from "@/schema/login-schema.zod";
import {
  onboardingSchema,
  onboardingSchemaType,
} from "@/schema/onboarding-schema.zod";
import { signIn, signOut } from "@/utils/auth";
import { db } from "@/utils/db.dirzzle";
import { users } from "@drizzle/schema.drizzle";
import { eq } from "drizzle-orm"; // <-- import eq for where clause
import { getSession } from "@/utils/hooks/use-session.hook";

export async function actionLogin(data: LoginSchemaType) {
  try {
    return await signIn("resend", {
      ...data,
      redirect: false,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.error("The error is: ", error);
  }
}

export async function actionLogout() {
  await signOut({ redirect: true, redirectTo: "/login" });
}

export async function onboardUser(data: onboardingSchemaType) {
  const session = await getSession();

  const parsed_data = onboardingSchema.safeParse(data);

  if (parsed_data.success !== true) {
    return {
      type: "error",
      errors: parsed_data.error.flatten().fieldErrors,
    };
  }

  await db
    .update(users)
    .set({
      firstName: parsed_data.data.first_name,
      lastName: parsed_data.data.last_name,
      address: parsed_data.data.address,
    })
    .where(eq(users.id, session.userId));
}

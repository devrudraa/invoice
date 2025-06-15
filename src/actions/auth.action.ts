"use server";
import { LoginSchemaType } from "@/schema/login-schema.zod";
import {
  onboardingSchema,
  onboardingSchemaType,
} from "@/schema/onboarding-schema.zod";
import { signIn, signOut } from "@/utils/auth";
import prisma from "@/utils/db.prisma";
import { getSession } from "@/utils/hooks/use-session.hook";

export async function actionLogin(data: LoginSchemaType) {
  try {
    return await signIn("resend", {
      ...data,
      redirect: false,
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
    // console.log(parsed_data?.error);

    return {
      type: "error",
      errors: parsed_data.error.flatten().fieldErrors, // Return structured errors
    };
  }

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: parsed_data.data.first_name,
      lastName: parsed_data.data.last_name,
      address: parsed_data.data.address,
    },
  });

  // console.log(session);
  console.log(parsed_data);
}

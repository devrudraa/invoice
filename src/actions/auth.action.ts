"use server";
import { LoginSchemaType } from "@/schema/login-schema.zod";
import { signIn, signOut } from "@/utils/auth";

export async function actionLogin(data: LoginSchemaType) {
  try {
    signIn("nodemailer", data);
  } catch (error) {
    console.error("The error is: ", error);
  }
}

export async function actionLogout() {
  signOut();
}

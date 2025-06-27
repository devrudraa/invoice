import NextAuth from "next-auth";
// import Nodemailer from "next-auth/providers/nodemailer";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import Resend from "next-auth/providers/resend";
import { db } from "./db.dirzzle";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "auth@rudracode.com",
    }),
  ],
  pages: {
    signOut: "/login",
    signIn: "/dashboard",
    verifyRequest: "/verify",
  },
  callbacks: {
    async session({ session, user }) {
      const db_user = await db.query.users.findFirst({
        where: (fields, { eq }) => eq(fields.id, user.id),
      });

      // Setting onboarding false or true based of if firstName and address is present
      // Not using lastName as it is optional in schema.prisma
      if (db_user && db_user?.firstName && db_user?.address) {
        session.onboarded = true; // Set onboarded to true if both fields exist
      } else {
        session.onboarded = false; // Set onboarded to false if either field is missing
      }

      return session;
    },
  },
});

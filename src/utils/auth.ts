import NextAuth from "next-auth";
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

      if (db_user) {
        session.user = {
          id: db_user.id,
          email: db_user.email!,
          firstName: db_user.firstName!,
          lastName: db_user.lastName!,
          address: db_user.address!,
          createdAt: db_user.createdAt!,
          emailVerified: db_user.emailVerified,
          name: db_user.firstName + " " + db_user.lastName,
        };
      }

      // Setting onboarding false or true based of if firstName and address is present
      // Not using lastName as it is optional in schema.prisma
      session.onboarded = !!(db_user?.firstName && db_user?.address);

      return session;
    },
  },
});

import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import Resend from "next-auth/providers/resend";
import { db } from "./db.dirzzle";
import { resend } from "./resend-send";
import MagicLinkEmail from "../../emails/magic-link";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "EzyInvoice - SignIn <invoice@rudracode.com>",
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { from },
      }) {
        const { data, error } = await resend.emails.send({
          from: from || "EzyInvoice - SignIn <invoice@rudracode.com>",
          to: [email],
          subject: "Sign in to your account",
          react: MagicLinkEmail({
            hostUrl: process.env.NEXT_PUBLIC_URL,
            magicLink: url,
          }),
        });

        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:", data);
        }
      },
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
      // Not using lastName as it is optional in schema
      session.onboarded = !!(db_user?.firstName && db_user?.address);

      return session;
    },
  },
});

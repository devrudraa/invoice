import NextAuth from "next-auth";
// import Nodemailer from "next-auth/providers/nodemailer";
import Resend from "next-auth/providers/resend";
import prisma, { CustomPrismaAdapter } from "./db.prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "auth@rudracode.com",
    }),
    // Nodemailer({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  pages: {
    signOut: "/login",
    signIn: "/dashboard",
    verifyRequest: "/verify",
  },
  callbacks: {
    async session({ session, user }) {
      const db_user = await prisma.user.findUnique({ where: { id: user.id } });

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

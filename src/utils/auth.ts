import NextAuth from "next-auth";
// import Nodemailer from "next-auth/providers/nodemailer";
import Resend from "next-auth/providers/resend";
import prisma, { CustomPrismaAdapter } from "./db.prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "auth@kritisartwork.shop",
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
});

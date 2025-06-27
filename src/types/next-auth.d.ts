// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

// Extend the NextAuth session and user types
declare module "next-auth" {
  interface Session {
    expires: string;
    onboarded: boolean;
    sessionToken: string;

    createdAt: string;
  }

  interface User {
    id: string;
    email: string;
    emailVerified: string;

    firstName: string;
    lastName: string;
    address: string;
    createdAt: string;
  }
}

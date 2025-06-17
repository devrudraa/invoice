// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

// Extend the NextAuth session and user types
declare module "next-auth" {
  interface Session {
    onboarded: boolean;
    createdAt: string;
    expires: string;
    onboarded: boolean;
    sessionToken: string;
    updatedAt: string;
    userId: string;
  }

  interface User {
    id: string;
    address: string;
    createdAt: string;
    email: string;
    emailVerified: string;
    firstName: string;
    id: string;
    lastName: string;
    name: string;
  }
}

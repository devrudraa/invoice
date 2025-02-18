// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

// Extend the NextAuth session and user types
declare module "next-auth" {
  interface Session {
    onboarded: boolean; // Add customField to the session
  }

  interface User {
    id: string; // Make sure to include the user ID in the User type if it's not already there
  }
}

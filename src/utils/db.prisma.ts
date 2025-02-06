import { PrismaClient, Session } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export function CustomPrismaAdapter(p: PrismaClient): Adapter {
  const origin = PrismaAdapter(p);
  return {
    ...origin,
    // fix: Record to delete does not exist. https://github.com/nextauthjs/next-auth/issues/4495
    deleteSession: async (sessionToken: Session["sessionToken"]) => {
      try {
        const session = await p.session.findUnique({
          where: { sessionToken },
        });

        if (!session) {
          return null;
        }

        return await p.session.delete({
          where: { sessionToken },
        });
      } catch (e) {
        console.error("Failed to delete session", e);
        return null;
      }
    },
  } as unknown as Adapter;
}

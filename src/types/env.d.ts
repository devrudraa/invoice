// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      EMAIL_SERVER_USER: string;
      EMAIL_SERVER_PASSWORD: string;
      EMAIL_SERVER_HOST: string;
      EMAIL_SERVER_PORT: number;
      EMAIL_FROM: string;
      DATABASE_URL: string;
      NEXT_PUBLIC_URL: string;
      TURSO_AUTH_TOKEN: string;
      TURSO_DATABASE_URL: string;
    }
  }
}

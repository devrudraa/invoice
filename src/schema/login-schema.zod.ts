import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

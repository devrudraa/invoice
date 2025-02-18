import { z } from "zod";

export const onboardingSchema = z.object({
  first_name: z.string().trim().min(3).max(50),
  last_name: z.string().trim().max(50),
  address: z.string().trim().min(5).max(100),
});

export type onboardingSchemaType = z.infer<typeof onboardingSchema>;

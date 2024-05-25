import { z } from "zod";

export const EnvSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
});

export type EnvType = z.infer<typeof EnvSchema>;

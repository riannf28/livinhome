import { z } from "zod";

export const EnvSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
});

export type EnvType = z.infer<typeof EnvSchema>;

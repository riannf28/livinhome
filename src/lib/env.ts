import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number(),
    JWT_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().min(1),
    JWT_REFRESH_EXPIRES_IN: z.string().min(1),
    MINIO_ENDPOINT: z.string(),
    MINIO_BUCKET: z.string().min(1),
    MINIO_PORT: z.coerce.number(),
    MINIO_ACCESS_KEY: z.string().min(1),
    MINIO_SECRET_KEY: z.string().min(1),
    MINIO_USE_SSL: z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .pipe(z.boolean()),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

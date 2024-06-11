import { env } from "@/lib/env";
import { minio } from "@/lib/minio";

const URL_EXPIRY = 3600;

export const getFileUrlUsecase = async (key: string): Promise<string> => {
  const bucket = env.MINIO_BUCKET;

  const url = await minio.presignedGetObject(bucket, key, URL_EXPIRY);

  return url;
};

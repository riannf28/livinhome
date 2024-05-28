import { env } from "@/lib/env";
import { minio } from "@/lib/minio";
import { HTTPException } from "hono/http-exception";

export const uploadFileUsecase = async (
  file: File,
  key: string
): Promise<string> => {
  const bucketName = env.MINIO_BUCKET;
  try {
    await minio.putObject(bucketName, key, await file.text());
    return key;
  } catch (error) {
    throw new HTTPException(500, { message: "Failed to upload file" });
  }
};

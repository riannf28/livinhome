import { env } from "@/lib/env";
import { minio } from "@/lib/minio";

export const deleteFileUsecase = async (key: string): Promise<void> => {
  const bucket = env.MINIO_BUCKET;

  try {
    await minio.removeObject(bucket, key, {
      forceDelete: true,
    });
  } catch (error) {
    throw error;
  }
};

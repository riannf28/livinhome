import { retryAction } from "@/helpers/retry";
import { env } from "@/lib/env";
import { minio } from "@/lib/minio";
import { UploadFileResponse } from "@/responses/files";

export const uploadFile = async ({
  file,
  key,
  retry = 3,
}: {
  file: File;
  key: string;
  retry?: number;
}): Promise<UploadFileResponse> => {
  const bucket = env.MINIO_BUCKET;

  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const result = await retryAction(
    () =>
      minio.putObject(bucket, key, buffer, file.size, {
        "Content-Type": file.type,
      }),
    retry
  );

  return { key, result };
};

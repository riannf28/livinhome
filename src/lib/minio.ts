import { Client } from "minio";
import { env } from "./env";

const minioInstance = (): Client => {
  let instance: Client | null = null;

  if (!instance) {
    instance = new Client({
      accessKey: env.MINIO_ACCESS_KEY,
      secretKey: env.MINIO_SECRET_KEY,
      endPoint: env.MINIO_ENDPOINT,
      port: env.MINIO_PORT,
      useSSL: env.MINIO_USE_SSL,
    });
  }

  return instance;
};

export const minio = minioInstance();

export const checkBucket = async (): Promise<boolean> => {
  const bucketName = env.MINIO_BUCKET;

  try {
    console.log(`Checking bucket '${bucketName}' is exists...`);

    const bucketExists = await minio.bucketExists(bucketName);

    if (!bucketExists) {
      console.log(`Bucket '${bucketName}' is not exists, creating...`);
      await minio.makeBucket(bucketName);
    }

    console.log(`Bucket '${bucketName}' is exists`);
    return true;
  } catch (error) {
    console.error(`Failed to check bucket '${bucketName}'`);
    console.error(error);
    return false;
  }
};

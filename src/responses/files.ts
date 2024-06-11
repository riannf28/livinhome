import { Client } from "minio";

export type UploadFileResponse = {
  key: string;
  result: Awaited<ReturnType<Client["putObject"]>>;
};

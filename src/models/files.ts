import { PropertyFileSection } from "./properties";

export type GetFileKeyMeta = {
  fileName?: string;
  section: PropertyFileSection;
  fileExtension: string | null;
};

export type GetFileKeyDTO = GetFileKeyMeta & {
  propertyId: string;
};

export type UploadFilesResult = {
  successKeys: string[];
  keys: string[];
};

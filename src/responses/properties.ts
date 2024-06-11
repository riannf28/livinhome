import { UploadFilesResult } from "@/models/files";
import { PropertyDetails, PropertyOverview } from "@/models/properties";

export type CreatePropertyResponse = {
  id: string;
  createdAt: Date;
};

export type GetManyPropertiesResponse = PropertyOverview[];

export type GetPropertyByIdResponse = PropertyDetails;

export type AddPropertyPhotosResponse = {
  interior: UploadFilesResult;
  exterior: UploadFilesResult;
  surrounding: UploadFilesResult;
  bathrooms: UploadFilesResult;
  bedrooms: UploadFilesResult;
};

export type GetPropertyPhotosResponse = {
  interior: string[];
  exterior: string[];
  surrounding: string[];
  bathrooms: string[];
  bedrooms: string[];
};

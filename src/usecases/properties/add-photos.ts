import { AddPropertyPhotosDTO, PropertyFileSection } from "@/models/properties";
import { AddPropertyPhotosResponse } from "@/responses/properties";
import { getPropertyFileKeyUsecase } from "../files/get-property-file-key";
import mime from "mime";
import { uploadFile } from "@/repositories/files";
import { isFullfilled, isRejected } from "@/helpers/common-guard";
import { UploadFileResponse } from "@/responses/files";

export const addPropertyPhotosUsecase = async (
  dto: AddPropertyPhotosDTO
): Promise<AddPropertyPhotosResponse> => {
  const interiorKeys = dto.interior.map((photo) =>
    getPropertyFileKeyUsecase({
      propertyId: dto.propertyId,
      fileExtension: mime.getExtension(photo.type),
      section: PropertyFileSection.INTERIOR,
    })
  );

  const exteriorKeys = dto.exterior.map((photo) =>
    getPropertyFileKeyUsecase({
      propertyId: dto.propertyId,
      fileExtension: mime.getExtension(photo.type),
      section: PropertyFileSection.EXTERIOR,
    })
  );

  const surroundingKeys = dto.surrounding.map((photo) =>
    getPropertyFileKeyUsecase({
      propertyId: dto.propertyId,
      fileExtension: mime.getExtension(photo.type),
      section: PropertyFileSection.SURROUNDING,
    })
  );

  const bathroomKeys = dto.bathrooms.map((photo) =>
    getPropertyFileKeyUsecase({
      propertyId: dto.propertyId,
      fileExtension: mime.getExtension(photo.type),
      section: PropertyFileSection.BATHROOMS,
    })
  );

  const bedroomKeys = dto.bedrooms.map((photo) =>
    getPropertyFileKeyUsecase({
      propertyId: dto.propertyId,
      fileExtension: mime.getExtension(photo.type),
      section: PropertyFileSection.BEDROOMS,
    })
  );

  const interiorUploads = await Promise.allSettled(
    interiorKeys.map((key, index) => {
      return uploadFile({ file: dto.interior[index], key: key });
    })
  );

  const exteriorUploads = await Promise.allSettled(
    exteriorKeys.map((key, index) => {
      return uploadFile({ file: dto.exterior[index], key: key });
    })
  );

  const surroundingUploads = await Promise.allSettled(
    surroundingKeys.map((key, index) => {
      return uploadFile({ file: dto.surrounding[index], key: key });
    })
  );

  const bathroomUploads = await Promise.allSettled(
    bathroomKeys.map((key, index) => {
      return uploadFile({ file: dto.bathrooms[index], key: key });
    })
  );

  const bedroomUploads = await Promise.allSettled(
    bedroomKeys.map((key, index) => {
      return uploadFile({ file: dto.bedrooms[index], key: key });
    })
  );

  return {
    interior: {
      keys: interiorKeys,
      successKeys: interiorUploads.filter(isFullfilled).map((u) => u.value.key),
    },
    exterior: {
      keys: exteriorKeys,
      successKeys: exteriorUploads.filter(isFullfilled).map((u) => u.value.key),
    },
    surrounding: {
      keys: surroundingKeys,
      successKeys: surroundingUploads
        .filter(isFullfilled)
        .map((u) => u.value.key),
    },
    bathrooms: {
      keys: bathroomKeys,
      successKeys: bathroomUploads.filter(isFullfilled).map((u) => u.value.key),
    },
    bedrooms: {
      keys: bedroomKeys,
      successKeys: bedroomUploads.filter(isFullfilled).map((u) => u.value.key),
    },
  };
};

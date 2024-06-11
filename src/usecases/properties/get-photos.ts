import { prisma } from "@/lib/prisma";
import { GetPropertyPhotosResponse } from "@/responses/properties";
import { HTTPException } from "hono/http-exception";
import { getFileUrlUsecase } from "../files/get-file-url";

export const getPropertyPhotosUsecase = async (
  propertyId: string
): Promise<GetPropertyPhotosResponse> => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    select: { photos: true },
  });

  if (!property)
    throw new HTTPException(404, { message: "Property not found" });

  const interiorUrls = await Promise.all(
    property.photos.interiorPhotoKeys.map((key) => getFileUrlUsecase(key))
  );

  const exteriorUrls = await Promise.all(
    property.photos.exteriorPhotoKeys.map((key) => getFileUrlUsecase(key))
  );

  const surroundingUrls = await Promise.all(
    property.photos.surroundingPhotoKeys.map((key) => getFileUrlUsecase(key))
  );

  const bathroomsUrls = await Promise.all(
    property.photos.bathroomsPhotoKeys.map((key) => getFileUrlUsecase(key))
  );

  const bedroomsUrls = await Promise.all(
    property.photos.bedroomsPhotoKeys.map((key) => getFileUrlUsecase(key))
  );

  return {
    interior: interiorUrls,
    exterior: exteriorUrls,
    surrounding: surroundingUrls,
    bathrooms: bathroomsUrls,
    bedrooms: bedroomsUrls,
  };
};

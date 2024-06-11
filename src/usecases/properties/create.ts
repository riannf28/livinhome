import { CreatePropertyDTO } from "@/models/properties";
import { createProperty } from "@/repositories/properties";
import { CreatePropertyResponse } from "@/responses/properties";
import { addPropertyPhotosUsecase } from "./add-photos";
import { prisma } from "@/lib/prisma";

export const createPropertyUsecase = async ({
  dto,
  ownerId,
}: {
  ownerId: string;
  dto: CreatePropertyDTO;
}): Promise<CreatePropertyResponse> => {
  const property = await createProperty({
    ownerId,
    dto,
  });

  const uploadedPhotos = await addPropertyPhotosUsecase({
    propertyId: property.id,
    interior: dto.interiorPhotos,
    exterior: dto.exteriorPhotos,
    surrounding: dto.surroundingPhotos,
    bathrooms: dto.facilityBathroomPhotos,
    bedrooms: dto.facilityBedroomPhotos,
  });

  await prisma.property.update({
    where: { id: property.id },
    data: {
      photos: {
        upsert: {
          create: {
            interiorPhotoKeys: uploadedPhotos.interior.successKeys,
            exteriorPhotoKeys: uploadedPhotos.exterior.successKeys,
            surroundingPhotoKeys: uploadedPhotos.surrounding.successKeys,
            bathroomsPhotoKeys: uploadedPhotos.bathrooms.successKeys,
            bedroomsPhotoKeys: uploadedPhotos.bedrooms.successKeys,
          },
          update: {
            interiorPhotoKeys: { set: uploadedPhotos.interior.successKeys },
            exteriorPhotoKeys: { set: uploadedPhotos.exterior.successKeys },
            surroundingPhotoKeys: {
              set: uploadedPhotos.surrounding.successKeys,
            },
            bathroomsPhotoKeys: { set: uploadedPhotos.bathrooms.successKeys },
            bedroomsPhotoKeys: { set: uploadedPhotos.bedrooms.successKeys },
          },
        },
      },
    },
  });

  return {
    id: property.id,
    createdAt: property.createdAt,
  };
};

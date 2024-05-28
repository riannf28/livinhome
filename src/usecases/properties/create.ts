import { CreatePropertyDTO, PropertyFileSection } from "@/models/properties";
import { createProperty } from "@/repositories/properties";
import { CreatePropertyResponse } from "@/responses/properties";
import mime from "mime";
import { getPropertyFileKey } from "../files/get-file-key";

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

  const interiorKeys = dto.interiorPhotos.map((photo) =>
    getPropertyFileKey({
      propertyId: property.id,
      fileExtension: mime.getExtension(photo.type),
      section: PropertyFileSection.INTERIOR,
    })
  );

  console.log(interiorKeys);

  return {
    id: property.id,
    createdAt: property.createdAt,
  };
};

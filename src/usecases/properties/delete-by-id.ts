import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { deleteFileUsecase } from "../files/delete-file";
import { getPropertyFileKeyUsecase } from "../files/get-property-file-key";
import { getPropertyBaseKeyUsecase } from "../files/get-property-base-key";

export const deletePropertyByIdUsecase = async (
  propertyId: string,
  ownerId: string
): Promise<void> => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { ownerId: true },
    });

    if (!property)
      throw new HTTPException(404, { message: "Property not found" });

    if (property.ownerId !== ownerId)
      throw new HTTPException(403, { message: "Forbidden Resource" });

    await prisma.property.delete({ where: { id: propertyId } });

    const propertyKey = getPropertyBaseKeyUsecase(propertyId);
    await deleteFileUsecase(propertyKey);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === PrismaClientErrors.OPERATION_DEPENDS_ON_RECORD_NOT_FOUND
      ) {
        throw new HTTPException(404, { message: "Property not found" });
      }
    }
    throw error;
  }
};

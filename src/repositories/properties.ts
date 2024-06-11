import { prisma } from "@/lib/prisma";
import { CreatePropertyDTO } from "@/models/properties";
import { Property } from "@prisma/client";

export const createProperty = async ({
  dto,
  ownerId,
}: {
  ownerId: string;
  dto: CreatePropertyDTO;
}): Promise<Property> => {
  const rentableAt = new Date(dto.rentableAt);

  return prisma.property.create({
    data: {
      name: dto.name,
      buildingAge: dto.buildingAge,
      rentableAt,
      description: dto.description,
      enableLivinmates: dto.enableLivinmates,
      rentForGender: dto.rentForGender,
      owner: { connect: { id: ownerId } },
      ownerBankAccount: { connect: { id: dto.plansBankAccountId } },
      address: {
        create: {
          province: dto.province,
          city: dto.city,
          village: dto.village,
          completeAddress: dto.completeAddress,
          addressNote: dto.addressNote,
        },
      },
      pricingPlans: {
        create: {
          minimumStayMonth: dto.plansMinimumStayMonth,
          annualPrice: dto.plansAnnualPrice,
          additionalCost: dto.plansAdditionalCost,
        },
      },
      photos: {
        create: {
          interiorPhotoKeys: [],
          exteriorPhotoKeys: [],
          surroundingPhotoKeys: [],
        },
      },
      specifications: {
        create: {
          facilityStatus: dto.facilityStatus,
          landArea: dto.facilityLandArea,
          buildingArea: dto.facilityBuildingArea,
          electricity: dto.facilityElectricity,
          waterSource: dto.facilityWaterSource,
          bedroom: dto.facilityBedrooms,
          hasBed: dto.facilityBedroomHasBed,
          hasDesk: dto.facilityBedroomHasDesk,
          hasWardrobe: dto.facilityBedroomHasWardrobe,

          bathroom: dto.facilityBathrooms,
          hasBucket: dto.facilityBathroomHasBucket,
          hasShower: dto.facilityBathroomHasShower,
          isSittingToilet: dto.facilityBathroomIsSittingToilet,

          hasBalcony: dto.facilityOtherBalcony,
          hasKitchen: dto.facilityOtherKitchen,
          hasLivingRoom: dto.facilityOtherLivingRoom,
          hasDiningRoom: dto.facilityOtherDiningRoom,
          hasFamilyRoom: dto.facilityOtherFamilyRoom,
          hasGarage: dto.facilityOtherGarage,
          hasDryYard: dto.facilityDryYard,
          hasWarehouse: dto.facilityOtherWarehouse,
        },
      },
    },
  });
};

export const getManyProperties = async () => {
  return prisma.property.findMany({
    orderBy: { updatedAt: "desc" },
    where: {
      deletedAt: { equals: null },
    },
    include: {
      address: true,
      pricingPlans: true,
      photos: true,
      specifications: true,
    },
  });
};

export const getPropertyById = async (propertyId: string) => {
  return prisma.property.findUnique({
    where: { id: propertyId, deletedAt: { equals: null } },
    include: {
      address: true,
      pricingPlans: true,
      photos: true,
      specifications: true,
      owner: {
        include: {
          profile: true,
        },
      },
    },
  });
};

export const updateProperty = async () => {
  throw new Error("Not implemented");
};

export const deleteProperty = async (
  propertyId: string,
  hardDelete: boolean
) => {
  if (hardDelete) {
    return prisma.property.delete({ where: { id: propertyId } });
  }

  return prisma.property.update({
    where: { id: propertyId },
    data: { deletedAt: new Date() },
  });
};

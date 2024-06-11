import {
  PropertyAddress,
  PropertyRentForGender,
  PropertyRules,
  PropertySpecificationFacilityStatus,
  PropertySpecificationWaterSource,
  PropertySpecifications,
} from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { FormTextBoolSchema } from "./utils";

export const CreatePropertySchema = zfd.formData({
  name: zfd.text(),
  buildingAge: zfd.numeric(z.number().positive()),
  rentableAt: zfd.text(z.string().transform((v) => new Date(v))).pipe(z.date()),
  rentForGender: zfd.text(z.nativeEnum(PropertyRentForGender)),
  description: zfd.text(),
  rules: zfd.repeatable(z.array(z.nativeEnum(PropertyRules))),
  enableLivinmates: FormTextBoolSchema,

  province: zfd.text(),
  city: zfd.text(),
  village: zfd.text(),
  completeAddress: zfd.text(),
  addressNote: zfd.text(z.string().optional()),

  interiorPhotos: zfd.repeatable(z.array(zfd.file()).min(1)),
  exteriorPhotos: zfd.repeatable(z.array(zfd.file()).min(1)),
  surroundingPhotos: zfd.repeatable(z.array(zfd.file()).min(1)),

  facilityStatus: zfd.text(z.nativeEnum(PropertySpecificationFacilityStatus)),
  facilityLandArea: zfd.numeric(z.number().positive()),
  facilityBuildingArea: zfd.numeric(z.number().positive()),
  facilityElectricity: zfd.numeric(z.number().positive()),
  facilityWaterSource: zfd.text(z.nativeEnum(PropertySpecificationWaterSource)),

  facilityBedrooms: zfd.numeric(z.number().int().positive()),
  facilityBedroomPhotos: zfd.repeatable(z.array(zfd.file()).min(1)),
  facilityBedroomHasWardrobe: FormTextBoolSchema,
  facilityBedroomHasBed: FormTextBoolSchema,
  facilityBedroomHasDesk: FormTextBoolSchema,

  facilityBathrooms: zfd.numeric(z.number().int().positive()),
  facilityBathroomPhotos: zfd.repeatable(z.array(zfd.file()).min(1)),
  facilityBathroomHasBucket: FormTextBoolSchema,
  facilityBathroomHasShower: FormTextBoolSchema,
  facilityBathroomIsSittingToilet: FormTextBoolSchema,

  facilityOtherBalcony: FormTextBoolSchema,
  facilityOtherKitchen: FormTextBoolSchema,
  facilityOtherLivingRoom: FormTextBoolSchema,
  facilityOtherDiningRoom: FormTextBoolSchema,
  facilityOtherFamilyRoom: FormTextBoolSchema,
  facilityOtherGarage: FormTextBoolSchema,
  facilityDryYard: FormTextBoolSchema,
  facilityOtherWarehouse: FormTextBoolSchema,

  plansMinimumStayMonth: zfd.numeric(z.number().int().positive()),
  plansAnnualPrice: zfd.numeric(z.number().positive()),
  plansAdditionalCost: zfd.numeric(z.number().positive().optional()),
  plansBankAccountId: zfd.text(),
});

export type CreatePropertyDTO = z.infer<typeof CreatePropertySchema>;

export type PropertyOverview = {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  bedroom: number;
  bathroom: number;
  landArea: number;
  location: {
    province: string;
    city: string;
    village: string;
  };
  ratings: {
    average: number;
    count: number;
  };
};

export type PropertyDetails = {
  id: string;
  name: string;
  price: number;
  photos: {
    interior: string[];
    exterior: string[];
    surrounding: string[];
    bedrooms: string[];
    bathrooms: string[];
  };
  rentableAt: Date;
  owner: {
    id: string;
    name: string;
    ratings: number;
  };
  specifications: PropertySpecifications;
  address: PropertyAddress;
};

export const PropertyFileSection = {
  INTERIOR: "interior",
  EXTERIOR: "exterior",
  SURROUNDING: "surrounding",
  BATHROOMS: "bathrooms",
  BEDROOMS: "bedrooms",
} as const;

export type PropertyFileSection =
  (typeof PropertyFileSection)[keyof typeof PropertyFileSection];

export const AddPropertyPhotosSchema = zfd.formData({
  propertyId: zfd.text(),
  interior: zfd.repeatable(z.array(zfd.file()).min(1)),
  exterior: zfd.repeatable(z.array(zfd.file()).min(1)),
  surrounding: zfd.repeatable(z.array(zfd.file()).min(1)),
  bathrooms: zfd.repeatable(z.array(zfd.file()).min(1)),
  bedrooms: zfd.repeatable(z.array(zfd.file()).min(1)),
});

export type AddPropertyPhotosDTO = z.infer<typeof AddPropertyPhotosSchema>;

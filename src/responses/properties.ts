import { PropertyDetails, PropertyOverview } from "@/models/properties";

export type CreatePropertyResponse = {
  id: string;
  createdAt: Date;
};

export type GetManyPropertiesResponse = PropertyOverview[];

export type GetPropertyByIdResponse = PropertyDetails;

import { getPropertyById } from "@/repositories/properties";
import { GetPropertyByIdResponse } from "@/responses/properties";
import { HTTPException } from "hono/http-exception";
import { getPropertyPhotosUsecase } from "./get-photos";

export const getPropertyByIdUsecase = async (
  id: string
): Promise<GetPropertyByIdResponse> => {
  const property = await getPropertyById(id);

  if (!property)
    throw new HTTPException(404, { message: "Property not found" });

  const { interior, exterior, surrounding, bathrooms, bedrooms } =
    await getPropertyPhotosUsecase(id);

  return {
    id: property.id,
    name: property.name,
    price: property.pricingPlans.annualPrice,
    rentableAt: property.rentableAt,
    owner: {
      id: property.owner.id,
      name: property.owner.profile.name,
      ratings: 0,
    },
    photos: {
      interior,
      exterior,
      surrounding,
      bathrooms,
      bedrooms,
    },
    address: property.address,
    specifications: property.specifications,
  };
};

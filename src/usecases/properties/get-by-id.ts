import { getPropertyById } from "@/repositories/properties";
import { GetPropertyByIdResponse } from "@/responses/properties";
import { HTTPException } from "hono/http-exception";

export const getPropertyByIdUsecase = async (
  id: string
): Promise<GetPropertyByIdResponse> => {
  const property = await getPropertyById(id);

  if (!property)
    throw new HTTPException(404, { message: "Property not found" });

  const [interior, exterior, surrounding]: [string[], string[], string[]] =
    await Promise.all([[""], [""], [""]]);

  return {
    id: property.id,
    name: property.name,
    price: property.pricingPlans.annualPrice,
    rentableAt: property.rentableAt,
    owner: {
      id: property.owner.id,
      name: property.owner.name,
      ratings: 0,
    },
    photos: {
      interior,
      exterior,
      surrounding,
    },
    address: property.address,
    specifications: property.specifications,
  };
};

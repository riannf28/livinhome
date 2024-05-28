import { getManyProperties } from "@/repositories/properties";
import { GetManyPropertiesResponse } from "@/responses/properties";

export const getManyPropertiesUsecase =
  async (): Promise<GetManyPropertiesResponse> => {
    const properties = await getManyProperties();

    return properties.map((property) => ({
      id: property.id,
      name: property.name,
      price: property.pricingPlans.annualPrice,
      bathroom: property.specifications.bathroom,
      bedroom: property.specifications.bedroom,
      landArea: property.specifications.landArea,
      thumbnail: "https://via.placeholder.com/150",
      location: {
        province: property.address.province,
        city: property.address.city,
        village: property.address.village,
      },
      ratings: {
        average: 0,
        count: 0,
      },
    }));
  };

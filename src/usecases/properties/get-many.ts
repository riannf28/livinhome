import { getManyProperties } from "@/repositories/properties";
import { GetManyPropertiesResponse } from "@/responses/properties";
import { getFileUrlUsecase } from "../files/get-file-url";

export const getManyPropertiesUsecase =
  async (): Promise<GetManyPropertiesResponse> => {
    const properties = await getManyProperties();

    const founds = properties.map((property) => {
      const { interiorPhotoKeys, exteriorPhotoKeys, surroundingPhotoKeys } =
        property.photos;

      const thumbnail =
        exteriorPhotoKeys[0] || interiorPhotoKeys[0] || surroundingPhotoKeys[0];

      return {
        id: property.id,
        name: property.name,
        price: property.pricingPlans.annualPrice,
        bathroom: property.specifications.bathroom,
        bedroom: property.specifications.bedroom,
        landArea: property.specifications.landArea,
        thumbnail,
        location: {
          province: property.address.province,
          city: property.address.city,
          village: property.address.village,
        },
        ratings: {
          average: 0,
          count: 0,
        },
      };
    });

    const hasThumbnailProperty = founds.filter((p) => !!p.thumbnail);
    const promises = await Promise.all(
      hasThumbnailProperty.map((property) =>
        getFileUrlUsecase(property.thumbnail)
      )
    );

    let thumbnailIndex = 0;
    return founds.map((property) => {
      if (property.thumbnail) {
        return { ...property, thumbnail: promises[thumbnailIndex++] };
      }
      return property;
    });
  };

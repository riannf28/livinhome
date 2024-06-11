import { GetFileKeyDTO } from "@/models/files";
import { nanoid } from "nanoid";
import { getPropertyBaseKeyUsecase } from "./get-property-base-key";

export const getPropertyFileKeyUsecase = ({
  fileName,
  fileExtension,
  propertyId,
  section,
}: GetFileKeyDTO): string => {
  if (!fileName)
    fileName = `${nanoid(16)}${fileExtension ? `.${fileExtension}` : ""}`;

  const basePath = getPropertyBaseKeyUsecase(propertyId);

  return `${basePath}/${section + "/" ?? ""}${fileName}`;
};

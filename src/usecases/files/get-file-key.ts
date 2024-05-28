import { PropertyFileSection } from "@/models/properties";
import { nanoid } from "nanoid";

export const getPropertyFileKey = ({
  fileName,
  fileExtension,
  propertyId,
  section,
}: {
  fileName?: string;
  propertyId: string;
  section?: PropertyFileSection;
  fileExtension: string | null;
}): string => {
  if (!fileName)
    fileName = `${nanoid(16)}${fileExtension ? `.${fileExtension}` : ""}`;

  return `properties/${propertyId}/${section + "/" ?? ""}${fileName}`;
};

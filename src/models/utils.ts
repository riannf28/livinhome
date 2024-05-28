import { z } from "zod";
import { zfd } from "zod-form-data";

export const StringToBoolSchema = z
  .string()
  .toLowerCase()
  .transform((v) => v === "true")
  .pipe(z.boolean());

export const FormTextBoolSchema = zfd.text(StringToBoolSchema.default("false"));

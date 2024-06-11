import { z } from "zod";

export const GetUserProfileSchema = z.object({
  userId: z.string(),
  isSameUser: z.boolean(),
});

export type GetUserProfileDTO = z.infer<typeof GetUserProfileSchema>;

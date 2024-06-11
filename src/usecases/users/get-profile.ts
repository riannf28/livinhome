import { prisma } from "@/lib/prisma";
import { GetUserProfileDTO } from "@/models/users";
import { HTTPException } from "hono/http-exception";

export const getUserProfileUsecase = async ({
  userId,
  isSameUser,
}: GetUserProfileDTO) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
    include: {
      profile: true,
      bankAccounts: isSameUser,
    },
  });

  if (!user) throw new HTTPException(404, { message: "User tidak ditemukan" });

  return user;
};

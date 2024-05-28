import { prisma } from "@/lib/prisma";
import { JwtSignOptions, SignInDTO } from "@/models/auth";
import { AuthSignInUsecaseResponse } from "@/responses/auth";
import { verify } from "argon2";
import { HTTPException } from "hono/http-exception";
import { generateTokenUsecase } from "./generate-token";

export const signInUsecase = async (
  dto: SignInDTO,
  jwtOptions: JwtSignOptions
): Promise<AuthSignInUsecaseResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: dto.email },
    select: {
      id: true,
      role: true,
      password: true,
      profile: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user)
    throw new HTTPException(401, { message: "Email atau password salah" });

  const isPasswordMatch = await verify(user.password, dto.password);

  if (!isPasswordMatch)
    throw new HTTPException(401, { message: "Email atau password salah" });

  const { accessToken, refreshToken } = await generateTokenUsecase(
    { sub: user.id, role: user.role },
    jwtOptions
  );

  return {
    user: {
      id: user.id,
      name: user.profile.name,
      role: user.role,
    },
    token: {
      accessToken,
      refreshToken,
    },
  };
};

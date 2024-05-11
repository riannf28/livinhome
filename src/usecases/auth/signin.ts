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
      password: true,
    },
  });

  if (!user)
    throw new HTTPException(401, { message: "Email atau password salah" });

  const isPasswordMatch = await verify(user.password, dto.password);

  if (!isPasswordMatch)
    throw new HTTPException(401, { message: "Email atau password salah" });

  const { accessToken, refreshToken } = await generateTokenUsecase(
    { sub: user.id },
    jwtOptions
  );

  return {
    id: user.id,
    accessToken,
    refreshToken,
  };
};

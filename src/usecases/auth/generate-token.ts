import { generateTokenExpires } from "@/helpers/jwt-expires";
import { JwtPayload, JwtSignOptions } from "@/models/auth";
import { AuthGenerateTokenResponse } from "@/responses/auth";
import { sign } from "hono/jwt";

export const generateTokenUsecase = async (
  payload: JwtPayload,
  options: JwtSignOptions
): Promise<AuthGenerateTokenResponse> => {
  const [accessToken, refreshToken] = await Promise.all([
    sign(
      { ...payload, exp: generateTokenExpires(options.access.expiresIn) },
      options.access.secret
    ),
    sign(
      { ...payload, exp: generateTokenExpires(options.refresh.expiresIn) },
      options.refresh.secret
    ),
  ]);

  return { accessToken, refreshToken };
};

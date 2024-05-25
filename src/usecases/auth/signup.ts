import { prisma } from "@/lib/prisma";
import { SignUpDTO } from "@/models/auth";
import { AuthSignUpUsecaseResponse } from "@/responses/auth";
import { hash } from "argon2";
import { HTTPException } from "hono/http-exception";

export const signUpUsecase = async (
  dto: SignUpDTO
): Promise<AuthSignUpUsecaseResponse> => {
  const foundUser = await prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (foundUser)
    throw new HTTPException(400, { message: "Email sudah terdaftar" });

  const hashedPassword = await hash(dto.password);

  const user = await prisma.user.create({
    data: {
      email: dto.email,
      role: dto.role,
      name: dto.name,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    createdAt: user.createdAt,
  };
};

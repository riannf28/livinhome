import { UserRole } from "@prisma/client";
import { JWTPayload } from "hono/utils/jwt/types";
import { z } from "zod";

export const SignUpSchema = z.object({
  role: z.nativeEnum(UserRole),
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type JwtSignOptions = {
  access: { secret: string; expiresIn: string };
  refresh: { secret: string; expiresIn: string };
};

export type SignUpDTO = z.infer<typeof SignUpSchema>;
export type SignInDTO = z.infer<typeof SignInSchema>;

export type JwtPayload = { sub: string } & JWTPayload;

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  JwtPayload,
  JwtSignOptions,
  SignInSchema,
  SignUpSchema,
} from "@/models/auth";
import { jwtRefreshMiddleware, authenticated } from "@/middlewares/jwt";
import { env } from "hono/adapter";
import { EnvType } from "@/models/env";
import { signInUsecase } from "@/usecases/auth/signin";
import { signUpUsecase } from "@/usecases/auth/signup";
import { generateTokenUsecase } from "@/usecases/auth/generate-token";

export const authController = new Hono();

authController.post("/signin", zValidator("json", SignInSchema), async (c) => {
  const {
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN,
  } = env<EnvType>(c);
  const jwtOptions: JwtSignOptions = {
    access: {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    },
    refresh: {
      secret: JWT_REFRESH_SECRET,
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    },
  };

  const payload = c.req.valid("json");

  const result = await signInUsecase(payload, jwtOptions);

  return c.json(result, { status: 201 });
});

authController.post("/signup", zValidator("json", SignUpSchema), async (c) => {
  const payload = c.req.valid("json");

  const result = await signUpUsecase(payload);

  return c.json(result, { status: 201 });
});

authController.post("/refresh", jwtRefreshMiddleware, async (c) => {
  const jwtPayload: JwtPayload = c.get("jwtPayload");

  const {
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN,
  } = env<EnvType>(c);
  const jwtOptions: JwtSignOptions = {
    access: {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    },
    refresh: {
      secret: JWT_REFRESH_SECRET,
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    },
  };

  const result = await generateTokenUsecase(jwtPayload, jwtOptions);

  return c.json(result, { status: 201 });
});

authController.get("/me", authenticated, async (c) => {
  return c.json(c.get("jwtPayload"));
});

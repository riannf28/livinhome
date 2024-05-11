import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";
import { EnvType } from "../models/env";

export const authenticated = createMiddleware((c, next) => {
  const { JWT_SECRET } = env<EnvType>(c);

  const jwtMiddleware = jwt({
    secret: JWT_SECRET,
  });

  return jwtMiddleware(c, next);
});

export const jwtRefreshMiddleware = createMiddleware((c, next) => {
  const { JWT_REFRESH_SECRET } = env<EnvType>(c);

  const jwtMiddleware = jwt({
    secret: JWT_REFRESH_SECRET,
  });
  return jwtMiddleware(c, next);
});

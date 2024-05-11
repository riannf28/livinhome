import { JwtPayload } from "@/models/auth";
import { UserRole } from "@prisma/client";
import { createMiddleware } from "hono/factory";

export const requiredRoles = (...roles: UserRole[]) =>
  createMiddleware((c, next) => {
    const jwtPayload: JwtPayload = c.get("jwtPayload");

    return next();
  });

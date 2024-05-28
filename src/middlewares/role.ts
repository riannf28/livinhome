import { JwtPayload } from "@/models/auth";
import { UserRole } from "@prisma/client";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const requiredRoles = (...roles: UserRole[]) =>
  createMiddleware((c, next) => {
    const jwtPayload: JwtPayload = c.get("jwtPayload");

    if (!jwtPayload) throw new HTTPException(401, { message: "Unauthorized" });

    if (!roles.includes(jwtPayload.role))
      throw new HTTPException(403, { message: "Forbidden" });

    return next();
  });

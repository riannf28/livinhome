import { authenticated } from "@/middlewares/jwt";
import { requiredRoles } from "@/middlewares/role";
import { JwtPayload } from "@/models/auth";
import { CreatePropertySchema } from "@/models/properties";
import { createPropertyUsecase } from "@/usecases/properties/create";
import { getManyPropertiesUsecase } from "@/usecases/properties/get-many";
import { zValidator } from "@hono/zod-validator";
import { UserRole } from "@prisma/client";
import { Hono } from "hono";

export const propertiesController = new Hono();

propertiesController.get("/", async (c) => {
  const result = await getManyPropertiesUsecase();

  return c.json(result);
});

propertiesController.get("/:id", async (c) => {});

propertiesController.post(
  "/",
  authenticated,
  requiredRoles(UserRole.OWNER),
  zValidator("form", CreatePropertySchema),
  async (c) => {
    const jwtPayload: JwtPayload = c.get("jwtPayload");
    const payload = c.req.valid("form");

    const result = await createPropertyUsecase({
      ownerId: jwtPayload.sub,
      dto: payload,
    });

    return c.json(result, { status: 201 });
  }
);

propertiesController.put(
  "/:id",
  authenticated,
  requiredRoles(UserRole.OWNER),
  async (c) => {}
);

propertiesController.delete(
  "/:id",
  authenticated,
  requiredRoles(UserRole.OWNER),
  async (c) => {}
);

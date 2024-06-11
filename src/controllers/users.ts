import { authenticated } from "@/middlewares/jwt";
import { JwtPayload } from "@/models/auth";
import { getUserProfileUsecase } from "@/usecases/users/get-profile";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const usersController = new Hono();

usersController.get("/:id/profile", authenticated, async (c) => {
  const userId = c.req.param("id");

  const jwtPayload: JwtPayload = c.get("jwtPayload");
  const isSameUser = userId === jwtPayload.sub;

  const user = await getUserProfileUsecase({
    userId,
    isSameUser,
  });

  return c.json(user, { status: 200 });
});

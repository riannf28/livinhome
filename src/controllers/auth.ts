import { Hono } from "hono";

export const authController = new Hono();

authController.post("/login", (c) => {
  return c.json({ message: "Login successful" });
});

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { authController } from "@/controllers/auth";

const app = new Hono();

app.use(logger());

app.route("/auth", authController);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = process.env.PORT || 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  hostname: "0.0.0.0",
  port: Number(port),
});

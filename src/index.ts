import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { authController } from "@/controllers/auth";
import { prisma } from "./lib/prisma";
import { showRoutes } from "hono/dev";

const app = new Hono().basePath("/v1");

app.use(logger());

app.route("/auth", authController);

showRoutes(app, {
  verbose: true,
  colorize: true,
});

const port = process.env.PORT || 8080;

serve(
  {
    fetch: app.fetch,
    hostname: "0.0.0.0",
    port: Number(port),
  },
  (info) => {
    console.log(`Server is running on ${info.address}:${info.port}`);
    prisma.$connect();
  }
);

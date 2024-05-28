import { authController } from "@/controllers/auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { propertiesController } from "./controllers/properties";
import { checkBucket } from "./lib/minio";
import { prisma } from "./lib/prisma";

const app = new Hono().basePath("/v1");

app.use(logger());

app.route("/auth", authController);
app.route("/properties", propertiesController);

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
  async (info) => {
    console.log(`Server is running on ${info.address}:${info.port}`);
    await checkBucket();
    await prisma.$connect();
  }
);

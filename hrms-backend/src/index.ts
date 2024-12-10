import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "dotenv";
import user from "./controllers/employee.controllers";

config();
const port = process.env.PORT!;

const app = new Hono().basePath("/api/v1");
const route = app.route("/employee", user);

serve({
  fetch: app.fetch,
  port: parseInt(port),
});

export type AppType = typeof route;

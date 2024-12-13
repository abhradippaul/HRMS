import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "dotenv";
import user from "./controllers/employee.controllers";
import departments from "./controllers/department.controllers";

config();
const port = process.env.PORT!;

const app = new Hono().basePath("/api/v1");
const route = app.route("/employee", user).route("/department", departments);

serve({
  fetch: app.fetch,
  port: parseInt(port),
});

export type AppType = typeof route;

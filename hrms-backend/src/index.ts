import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { config } from "dotenv";
import auth from "./controllers/auth.controllers";
import user from "./controllers/employee.controllers";
import departments from "./controllers/department.controllers";
import { getSignedCookie } from "hono/cookie";
import { verifyJWTToken } from "./utils/jwt";
import { jwt } from "hono/jwt";

config();
const port = process.env.PORT!;

const app = new Hono()
  .basePath("/api/v1")
  .use("/employee/*", async (c, next) => {
    const cookie = await getSignedCookie(
      c,
      process.env.COOKIE_SECRET!,
      "access_token"
    );
    if (cookie) {
      const data = verifyJWTToken(cookie) as { id: string };
      c.set("jwtPayload", data);
      await next();
    } else {
      return c.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
  });
const route = app
  .route("/auth", auth)
  .route("/employee", user)
  .route("/department", departments);

serve({
  fetch: app.fetch,
  port: parseInt(port),
});

export type AppType = typeof route;

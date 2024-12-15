import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db/db";
import { employees } from "../db/schema";
import { compare } from "bcryptjs";
import { createJWTToken } from "../utils/jwt";
import {
  deleteCookie,
  getCookie,
  setCookie,
  setSignedCookie,
} from "hono/cookie";
import { eq } from "drizzle-orm";

const app = new Hono()
  .post(
    "/email-verification",
    zValidator(
      "json",
      z.object({
        email: z.string().optional(),
      })
    ),
    async (c) => {
      const { email } = c.req.valid("json");
      if (!email) {
        return c.json({
          message: "Credentials are required",
        });
      }
      const response = await db
        .select({
          id: employees.id,
        })
        .from(employees)
        .where(eq(employees.work_email, email));

      if (!response.length) {
        return c.json(
          {
            message: "User not found",
          },
          { status: 401 }
        );
      }

      setCookie(c, "verified-email", email, {
        secure: true,
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 300,
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });

      return c.json({
        message: "Email verification successful",
      });
    }
  )
  .post(
    "/password-verification",
    zValidator(
      "json",
      z.object({
        password: z.string().optional(),
      })
    ),
    async (c) => {
      const { password } = c.req.valid("json");
      const email = getCookie(c, "verified-email");
      console.log(email);
      if (!password || !email) {
        return c.json({
          message: "Credentials are required",
        });
      }
      const response = await db
        .select({
          id: employees.id,
          password: employees.password,
        })
        .from(employees)
        .where(eq(employees.work_email, email));

      if (!response.length) {
        return c.json(
          {
            message: "User not found",
          },
          { status: 401 }
        );
      }

      const isPasswordValid = await compare(password, response[0].password);

      if (!isPasswordValid) {
        return c.json(
          {
            message: "User not found",
          },
          { status: 401 }
        );
      }

      const access_token = createJWTToken({ id: response[0].id });

      deleteCookie(c, "verified-email");

      await setSignedCookie(
        c,
        "access_token",
        access_token,
        process.env.COOKIE_SECRET!,
        {
          secure: true,
          httpOnly: true,
          sameSite: "Strict",
          maxAge: 1000,
          expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
        }
      );

      return c.json({
        message: "Sign in successful",
      });
    }
  )
  .post("/sign-out", async (c) => {
    deleteCookie(c, "access_token");
    return c.json({ message: "Logged out successfully" });
  });

export default app;

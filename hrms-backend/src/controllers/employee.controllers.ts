import { Hono } from "hono";
import {
  departments,
  employees,
  insertEmployeeSchema,
  // insertReportingManagersSchema,
  // reporting_managers,
} from "../db/schema";
import { db } from "../db/db";
import { zValidator } from "@hono/zod-validator";
import { v4 } from "uuid";
import { eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { compare, hash } from "bcryptjs";
import { z } from "zod";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie";
import { createJWTToken } from "../utils/jwt";

const app = new Hono()
  .get("/", async (c) => {
    const managers = alias(employees, "managers");
    const data = await db
      .select()
      .from(employees)
      .leftJoin(managers, eq(employees.manager_id, managers.id))
      .leftJoin(departments, eq(departments.id, employees.department_id));
    return c.json({
      message: "Hello Node.js from user!",
      data,
    });
  })
  .post(
    "/",
    zValidator(
      "json",
      insertEmployeeSchema.omit({
        id: true,
        // timestamp: true,
      })
    ),
    async (c) => {
      const {
        first_name,
        last_name,
        manager_id,
        department_id,
        password,
        work_email,
      } = c.req.valid("json");
      if (!first_name || !last_name || !password || !work_email) {
        return c.json(
          {
            message: "Credentials are required",
          },
          { status: 401 }
        );
      }
      const hashedPassword = await hash(password, 10);
      const response = await db.insert(employees).values({
        id: v4(),
        first_name,
        last_name,
        manager_id,
        department_id,
        password: hashedPassword,
        work_email,
      });
      console.log(response);
      return c.json({
        message: "Employee created successfully",
      });
    }
  )
  .post(
    "/sign-in",
    zValidator(
      "json",
      z.object({
        email: z.string().optional(),
        password: z.string().optional(),
      })
    ),
    async (c) => {
      const { email, password } = c.req.valid("json");
      if (!email || !password) {
        return c.json({
          message: "Credentials are required",
        });
      }
      const response = await db
        .select({
          password: employees.password,
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

      setCookie(c, "access_token", access_token);

      return c.json({
        message: "Login successful",
      });
    }
  );

export default app;

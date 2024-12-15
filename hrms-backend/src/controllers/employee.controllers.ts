import { Hono } from "hono";
import { departments, employees, insertEmployeeSchema } from "../db/schema";
import { db } from "../db/db";
import { zValidator } from "@hono/zod-validator";
import { v4 } from "uuid";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { hash } from "bcryptjs";

const app = new Hono()
  .get("/", async (c) => {
    const test = c.get("jwtPayload");
    const managers = alias(employees, "managers");
    const data = await db
      .select()
      .from(employees)
      .where(eq(test.id, employees.id))
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
  );

export default app;

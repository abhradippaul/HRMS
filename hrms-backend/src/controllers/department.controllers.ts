import { Hono } from "hono";
import { db } from "../db/db";
import { zValidator } from "@hono/zod-validator";
import { v4 } from "uuid";
import { departments, insertDepartmentsSchema } from "../db/schema";

const app = new Hono()
  .get("/", async (c) => {
    // db.insert(employees).values({})
    const data = await db.select().from(departments);
    return c.json({
      message: "Hello Node.js from user!",
      data,
    });
  })
  .post(
    "/",
    zValidator(
      "json",
      insertDepartmentsSchema.omit({
        id: true,
        timestamp: true,
      })
    ),
    async (c) => {
      const { name, description } = c.req.valid("json");
      if (!name) {
        return c.json(
          {
            message: "Credentials are required",
          },
          { status: 401 }
        );
      }
      const response = await db.insert(departments).values({
        id: v4(),
        name,
        description,
      });
      console.log(response);
      return c.json({
        message: "Department created successfully",
      });
    }
  );

export default app;

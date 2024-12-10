import { Hono } from "hono";
import { employees, insertEmployeeSchema } from "../db/schema";
import { db } from "../db/db";
import { zValidator } from "@hono/zod-validator";
import { v4 } from "uuid";

const app = new Hono()
  .get("/", async (c) => {
    // db.insert(employees).values({})
    return c.text("Hello Node.js from user!");
  })
  .post(
    "/",
    zValidator(
      "json",
      insertEmployeeSchema.omit({
        id: true,
        timestamp: true,
      })
    ),
    async (c) => {
      const { name, emp_id, age, date_of_birth } = c.req.valid("json");
      if (!name || !emp_id) {
        return c.json(
          {
            message: "Credentials are required",
          },
          { status: 401 }
        );
      }
      const response = await db.insert(employees).values({
        id: v4(),
        name,
        emp_id,
        age,
        date_of_birth,
      });
      console.log(response);
      return c.json({
        message: "Employee created successfully",
      });
    }
  );

export default app;

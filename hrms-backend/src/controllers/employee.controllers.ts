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
      const { first_name, last_name, manager_id, department_id } =
        c.req.valid("json");
      if (!first_name || !last_name) {
        return c.json(
          {
            message: "Credentials are required",
          },
          { status: 401 }
        );
      }
      const response = await db.insert(employees).values({
        id: v4(),
        first_name,
        last_name,
        manager_id,
        department_id,
      });
      console.log(response);
      return c.json({
        message: "Employee created successfully",
      });
    }
  );
// .post(
//   "/manager",
//   zValidator(
//     "json",
//     insertReportingManagersSchema.omit({
//       id: true,
//       timestamp: true,
//     })
//   ),
//   async (c) => {
//     const { employee, manager } = c.req.valid("json");
//     if (!employee || !manager) {
//       return c.json(
//         {
//           message: "Employee ID and Manager ID are required",
//         },
//         { status: 401 }
//       );
//     }
//     const response = await db.insert(reporting_managers).values({
//       id: v4(),
//       employee,
//       manager,
//     });
//     console.log(response);
//     return c.json({
//       message: "Reporting manager created successfully",
//     });
//   }
// );

export default app;

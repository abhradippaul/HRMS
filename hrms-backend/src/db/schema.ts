import { InferInsertModel, relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  numeric,
  date,
  serial,
  pgSchema,
  PgText,
  PgNumeric,
  PgSerial,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const employees = pgTable("employees", {
  id: text().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  age: integer(),
  emp_id: varchar({ length: 10 }).notNull().unique(),
  date_of_birth: date({ mode: "date" }),
  timestamp: timestamp().default(sql`now()`),
});

export const insertEmployeeSchema = createInsertSchema(employees);

// , {
//   date_of_birth: z.coerce.date(),
// }

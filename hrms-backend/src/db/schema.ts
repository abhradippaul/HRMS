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
  PgEnum,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const employees = pgTable("employees", {
  id: varchar({ length: 40 }).primaryKey(),
  // emp_id: varchar({ length: 8 }).notNull().unique(),
  first_name: varchar({ length: 50 }).notNull(),
  last_name: varchar({ length: 50 }).notNull(),
  work_email: varchar({ length: 50 }).notNull().unique(),
  department_id: text().references(() => departments.id, {
    onDelete: "set null",
  }),
  manager_id: varchar({ length: 40 }).references(
    (): AnyPgColumn => employees.id,
    {
      onDelete: "set null",
    }
  ),
  password: text().notNull(),
  email_otp: varchar({ length: 6 }),
  reset_password_otp: varchar({ length: 6 }),
  // ph_number: varchar({ length: 10 }),
  // // .notNull().unique(),
  // age: integer().notNull(),
  // personal_email: varchar({ length: 50 }),
  // // .notNull().unique(),
  // emp_type: varchar({ length: 50 }),
  // // .notNull(),
  // marital_status: text({ enum: ["single", "married"] }).default("single"),
  // seating_location: varchar({ length: 50 }),
  // // .notNull(),
  // present_address: varchar({ length: 150 }),
  // // .notNull(),
  // permanent_address: varchar({ length: 150 }),
  // // .notNull(),
  // uan: varchar({ length: 50 }),
  // pan: varchar({ length: 50 }),
  // aadhaar: varchar({ length: 50 }),
  // date_of_birth: date({ mode: "date" }),
  // timestamp: timestamp().default(sql`now()`),
});

export const employeesRelation = relations(employees, ({ one }) => ({
  department: one(departments, {
    fields: [employees.department_id],
    references: [departments.id],
  }),
  manager: one(employees, {
    fields: [employees.manager_id],
    references: [employees.id],
  }),
}));

export const insertEmployeeSchema = createInsertSchema(employees);

export const departments = pgTable("departments", {
  id: varchar({ length: 40 }).primaryKey(),
  name: varchar({ length: 10 }).notNull().unique(),
  description: varchar({ length: 50 }),
  timestamp: timestamp().default(sql`now()`),
});

export const departmentsRelation = relations(departments, ({ many }) => ({
  employees: many(employees),
}));

export const insertDepartmentsSchema = createInsertSchema(departments);

// , {
//   date_of_birth: z.coerce.date(),
// }

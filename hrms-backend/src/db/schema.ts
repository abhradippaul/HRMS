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
  id: text().primaryKey(),
  // emp_id: varchar({ length: 8 }).notNull().unique(),
  first_name: varchar({ length: 50 }).notNull(),
  last_name: varchar({ length: 50 }).notNull(),
  // work_email: varchar({ length: 50 }).notNull().unique(),
  department_id: text().references(() => departments.id, {
    onDelete: "set null",
  }),
  manager_id: text().references((): AnyPgColumn => employees.id, {
    onDelete: "set null",
  }),
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

export const employeesRelation = relations(employees, ({ one, many }) => ({
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
  id: text().primaryKey(),
  name: varchar({ length: 10 }).notNull().unique(),
  description: varchar({ length: 50 }),
  timestamp: timestamp().default(sql`now()`),
});

export const departmentsRelation = relations(departments, ({ many }) => ({
  employees: many(employees),
}));

export const insertDepartmentsSchema = createInsertSchema(departments);

// export const employees_joined_department = pgTable(
//   "employees_joined_department",
//   {
//     id: text().primaryKey(),
//     employee_id: text().references(() => employees.id, {
//       onDelete: "cascade",
//     }),
//     department_id: text().references(() => departments.id, {
//       onDelete: "cascade",
//     }),
//     timestamp: timestamp().default(sql`now()`),
//   }
// );

// export const insertEmployeesJoinedDepartment = createInsertSchema(
//   employees_joined_department
// );

// , {
//   date_of_birth: z.coerce.date(),
// }

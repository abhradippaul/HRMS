import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// export const sql = neon(process.env.DATABASE_URL!);
export const sql = neon(
  "postgresql://HRMS_DB_owner:SFuqEhIR92ko@ep-weathered-moon-a17oc5rb.ap-southeast-1.aws.neon.tech/HRMS_DB?sslmode=require"
);
export const db = drizzle(sql, { schema });

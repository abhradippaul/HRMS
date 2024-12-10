import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
// import ws from 'ws';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });
// neonConfig.webSocketConstructor = ws;
config({ path: "../../.env" });

async function main() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration completed");
  } catch (err) {
    console.log("Error during migration ", err);
    process.exit(1);
  }
}

main();

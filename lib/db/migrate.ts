import { env } from "../env.mjs";

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from "postgres";

const runMigrate = async () => {
  if(!env.DATABASE_URL) throw new Error("DATABASE_URI is not defined. 🤦");

  const connection = await postgres(env.DATABASE_URL, {max:1});
  const db = drizzle(connection);

  console.log("⏳ Running Migrations....")

  const start = Date.now()
  await migrate(db, {migrationsFolder: 'lib/db/migrations'});
  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
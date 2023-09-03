import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const sql = postgres(String(process.env.DATABASE_CONNECTION_STRING), { max: 1 })
const db = drizzle(sql);

const main = async () => {
    console.log("migrating...");
    // this will automatically run needed migrations on the database
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log("migration done.");
}

main().then(() => {
    process.exit()
})

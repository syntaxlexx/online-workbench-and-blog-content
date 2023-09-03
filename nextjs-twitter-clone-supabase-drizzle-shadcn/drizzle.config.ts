import type { Config } from 'drizzle-kit'

export default {
    schema: './src/lib/db/schema.ts',
    out: './drizzle',
    dbCredentials: {
        connectionString: String(process.env.DATABASE_CONNECTION_STRING)
    },
    driver: 'pg',
} satisfies Config;

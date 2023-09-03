import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

export const pool = new Pool({
    // database: 'postgres',
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    allowExitOnIdle: true,
});

// (async () => {
//     var client = await pool.connect()
//     try {
//         var result = await client.query('select $1::text as name', ['brianc'])
//         console.log('hello from', result.rows[0])
//     } finally {
//         client.release()
//     }
// })().catch(e => console.error(e.message, e.stack))

export const db = drizzle(pool, { schema })

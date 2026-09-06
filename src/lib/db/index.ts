import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const connectionString = process.env.DATABASE_URL!

// Supabase requires SSL in production; postgres package handles it automatically
// prepare: false required for Transaction pool mode (Supabase)
const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })

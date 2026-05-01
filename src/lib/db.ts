import { Pool } from 'pg'

const globalForPool = globalThis as unknown as {
  pool: Pool | undefined
}

const pool = globalForPool.pool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
})

if (process.env.NODE_ENV !== 'production') globalForPool.pool = pool

export default pool
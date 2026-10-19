import mysql from 'mysql2/promise'

// The database is created by hand in MySQL Workbench using db/schema.sql.
// This pool only reads from it.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'elfa_bakery',
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true
})

export default pool

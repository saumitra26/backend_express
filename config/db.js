import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  port: process.env.DB_PORT, 
  password: process.env.DB_PASS ,
  database: process.env.DB_NAME ,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_SSL === "true"   // required when connecting from Render
    ? { rejectUnauthorized: false }
    : undefined
});

export default pool;
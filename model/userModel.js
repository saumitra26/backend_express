import db from "../config/db.js";
import bcrypt from "bcryptjs";

/* -------- REGISTER (DB) -------- */
export const addUser = async ({ name, email, password }) => {
  const [existing] = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existing.length > 0) {
    return { exists: true };
  }

  const hashed = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed]
  );

  return { exists: false, id: result.insertId };
};

/* -------- LOGIN (DB) -------- */
export const checkLogin = async (email) => {
  console.log("LOGIN DB CONFIG:", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    db: process.env.DB_NAME,
    ssl: process.env.DB_SSL
  });

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows.length > 0
    ? { exists: true, user: rows[0] }
    : { exists: false };
};


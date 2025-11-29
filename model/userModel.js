import db from "../config/db.js";
import bcrypt from "bcryptjs";
export const addUser = async (user) => {

  const { name, email, password } = user;
    
  const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (existing.length > 0)
    return res.status(400).json({ message: "Email already exists" });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    "INSERT INTO users(name, email, password) VALUES(?, ?, ?)",
    [name, email, hashedPassword]
  );
console.log(result)
  return result.insertId > 0 ? result.insertId : null;
};
export const checkLogin = async (email) => {
  if (!email) throw new Error("Email is required");

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      return { exists: true, user: rows[0] };
    } else {
      return { exists: false };
    }
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
};


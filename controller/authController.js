import { addUser, checkLogin } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* Load PRIVATE key (used for signing tokens) */
const privateKey = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!privateKey) {
  console.error("❌ JWT_PRIVATE_KEY is missing");
}
console.log("PRIVATE KEY CHECK >>>");
console.log("starts with:", privateKey?.split("\n")[0]);
console.log("ends with:", privateKey?.split("\n").slice(-1)[0]);
console.log("length:", privateKey?.length);
/* -------- Generate Token (SIGN) -------- */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    privateKey,
    { algorithm: "RS256", expiresIn: "1h" }
  );
};

/* -------- REGISTER -------- */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const result = await addUser({ name, email, password });

    if (result.exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(201).json({
      message: "User registered successfully",
      id: result.id
    });
  } catch (error) {
    next(error);
  }
};

/* -------- LOGIN -------- */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await checkLogin(email);

    if (!result.exists)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = result.user;
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
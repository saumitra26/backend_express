import { addUser, checkLogin } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const privateKey = fs.readFileSync(
  path.join(__dirname, "../config/keys/private.key"),
  "utf-8"
);
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    privateKey,
    { algorithm: "RS256", expiresIn: "1h" }
  );
};
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = {
      email: email,
      password: password,
    };
    const createdId = await addUser(newUser);
    if (!createdId) {
      return res.status(404).json({ message: "Unsuccessful" });
    }
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await checkLogin(email);

    if (!result.exists) return res.status(401).json({ message: "Invalid credentials" });
    const user = result.user;
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("ee", isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

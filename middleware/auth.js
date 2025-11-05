import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const public_key = fs.readFileSync(
  path.join(__dirname, "../config/keys/public.key"),
  "utf8"
);

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({ message: "Not authorized , no token" });
    const token = authHeader.split(" ")[1];
    console.log("token1", token);
    const decode = jwt.verify(token, public_key, { algorithms: ["RS256"] });
    console.log("decode", decode);
    req.user = decode;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "forbidden" });
    }
    next();
  };
};

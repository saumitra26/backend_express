import jwt from "jsonwebtoken";

/* Load PUBLIC key (used for verification only) */
const publicKey  = Buffer.from(process.env.JWT_PUBLIC_KEY_B64, "base64").toString("utf8");

if (!publicKey) {
  console.error("❌ JWT_PUBLIC_KEY is missing");
}

/* -------- PROTECT (Verify Token) -------- */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

/* -------- AUTHORIZE BY ROLE -------- */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "forbidden" });
    }
    next();
  };
};
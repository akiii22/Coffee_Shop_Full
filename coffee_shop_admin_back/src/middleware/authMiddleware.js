import { verifyToken } from "../config/jwtUtils.js";

export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No or invalid token provided!" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

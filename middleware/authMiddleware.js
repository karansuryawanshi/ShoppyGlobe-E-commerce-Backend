import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  // If token is missing, deny access
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, "secretKey");

    // Attach user info (excluding password) to the request object
    req.user = await User.findById(decoded.id).select("-password");

    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

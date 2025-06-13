import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Utility to generate JWT token
const generateToken = (userId) =>
  jwt.sign({ id: userId }, "secretKey", { expiresIn: "2h" }); // Replace with process.env.JWT_SECRET

// Register new user
export const registerUser = async (req, res) => {
  const { email, userName, password } = req.body;

  // Check if email or username already exists
  const userExists = await User.findOne({ email });
  const userNameExist = await User.findOne({ userName });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  if (userNameExist)
    return res.status(400).json({ message: "UserName already exists" });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({ email, userName, password: hashedPassword });

  // Respond with user info and token
  res.status(201).json({
    _id: user._id,
    userName: userName,
    email: user.email,
    token: generateToken(user._id),
  });
};

// Login existing user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password is correct
  const isPasswordMatch =
    user && (await bcrypt.compare(password, user.password));

  if (!isPasswordMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  // Respond with user info and token
  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

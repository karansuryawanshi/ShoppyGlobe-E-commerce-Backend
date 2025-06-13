import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) =>
  jwt.sign({ id: userId }, "secretKey", { expiresIn: "2h" });

export const registerUser = async (req, res) => {
  const { email, userName, password } = req.body;

  const userExists = await User.findOne({ email });
  const userNameExist = await User.findOne({ userName });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  if (userNameExist)
    return res.status(400).json({ message: "UserName already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, userName, password: hashedPassword });

  res.status(201).json({
    _id: user._id,
    userName: userName,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

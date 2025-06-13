import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true, // Store email in lowercase
    unique: [true, "Mail should be unique"], // Ensure email uniqueness
    require: [true, "Email is required"], // Email is mandatory
  },
  userName: {
    type: String,
    unique: true, // Ensure username uniqueness
    require: [true, "UserName is required"], // Username is mandatory
  },
  password: {
    type: String,
    require: true, // Password is mandatory
    minlength: [6, "Password must contain least 6 characters"], // Minimum length validation
  },
});

// Create and export User model
const User = mongoose.model("User", userSchema);
export default User;

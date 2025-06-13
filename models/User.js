import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: [true, "Mail should be unique"],
    require: [true, "Email is required"],
  },
  userName: {
    type: String,
    unique: true,
    require: [true, "UserName is required"],
  },
  password: {
    type: String,
    require: true,
    minlength: [6, "Password must contain least 6 characters"],
  },
});

const User = mongoose.model("User", userSchema);
export default User;

// Import required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import route handlers
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// import { errorHandler } from "./middleware/errorMiddleware.js"; // Optional custom error handler

// Import DB connection and Product model
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Default products to be added into the database if none exist just for testing purpose
const defaultProducts = [
  {
    title: "boAt New Launch Rockerz 650 Pro",
    description:
      "Seamless Touch & Swipe Controls: Delve into heightened listening comfort with the smooth touch and swipe controls of the boAt Rockerz 650 Pro Bluetooth Headphones.",
    price: 999,
    stock: 30,
  },
  {
    title: "Sony PlayStation5 Gaming Console",
    description:
      "Slim Design: With PS5, players get powerful gaming technology packed inside a sleek and compact console design.",
    price: 899,
    stock: 50,
  },
];

// Mount route handlers
app.use("/products", productRoutes); // Product-related routes
app.use("/cart", cartRoutes); // Cart-related routes
app.use("/", authRoutes); // Authentication routes

// Function to add default products if DB is empty just for testing purpose
const addDefaultProducts = async () => {
  const count = await Product.countDocuments(); // Check if products already exist
  if (count === 0) {
    await Product.insertMany(defaultProducts); // Insert default products
    console.log("Default products inserted.");
  } else {
    console.log("Products already exist.");
  }
};

// Connect to MongoDB and start the server
mongoose
  .connect("mongodb://127.0.0.1:27017/shoppyglobe")
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server running on port ${process.env.PORT}`); // Log server status
    });
  })
  .then(() => {
    addDefaultProducts(); // add default products
  })
  .catch((err) => console.error("MongoDB connection error:", err)); // Handle DB connection errors

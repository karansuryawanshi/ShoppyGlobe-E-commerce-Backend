import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const app = express();
app.use(express.json());

// Default ptoducts to be added in mongoDB
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

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/", authRoutes);

// function to add default products for testing
const addDefaultProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(defaultProducts);
    console.log("Default products inserted.");
  } else {
    console.log("Products already exist.");
  }
};

// connectDB() and start server;
mongoose
  .connect("mongodb://127.0.0.1:27017/shoppyglobe")
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .then(() => {
    addDefaultProducts();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

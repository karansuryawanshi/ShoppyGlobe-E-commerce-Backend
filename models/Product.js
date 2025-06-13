import mongoose from "mongoose";

// Define Product Schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true, // Product title is mandatory
  },
  price: {
    type: Number,
    require: true, // Price is mandatory
    min: [0, "Price Should be greater than 0"], // Minimum price validation
  },
  description: {
    type: String,
    maxlength: [500, "Description can't exceed 500 characters"], // Max length constraint
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock must be greater than 0"], // Minimum stock validation
  },
});

// Create and export Product model
const Product = mongoose.model("Product", productSchema);
export default Product;

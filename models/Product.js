import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
    min: [0, "Price Should be greater than 0"],
  },
  description: {
    type: String,
    maxlength: [500, "Description can't exceed 500 characters"],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock must be greater than 0"],
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a User document
    ref: "User",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to a Product document
        ref: "Product",
        required: [true, "Product ID cannot be Empty"], // Custom error message
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"], // Minimum quantity validation
        default: 1, // Default quantity if not provided
      },
    },
  ],
});

// Create and export Cart model
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

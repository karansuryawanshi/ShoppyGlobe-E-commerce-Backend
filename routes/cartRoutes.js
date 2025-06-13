import express from "express";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.put("/:productId", protect, updateCartItem);
router.delete("/:productId", protect, removeCartItem);

export default router;

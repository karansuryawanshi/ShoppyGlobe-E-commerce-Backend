import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add a product to the cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Find cart for the current user
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    // Create new cart if it doesn't exist
    cart = new Cart({ userId: req.user._id, items: [{ productId, quantity }] });
  } else {
    // Check if item already exists in the cart
    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );
    if (itemIndex > -1) {
      // If exists, increment quantity

      // console.log(cart.items[itemIndex].quantity);
      cart.items[itemIndex].quantity =
        Number(cart.items[itemIndex].quantity) + Number(quantity);
    } else {
      // If not, add new item
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  res.status(200).json(cart); // Respond with updated cart
};

// Update quantity of an item in the cart
export const updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  // Find user's cart
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  // Find specific item in the cart
  const item = cart.items.find((item) => item.productId.equals(productId));
  if (!item) return res.status(404).json({ message: "Item not found in cart" });

  // Update quantity
  item.quantity = quantity;
  await cart.save();
  res.status(200).json(cart); // Respond with updated cart
};

// Remove an item from the cart
export const removeCartItem = async (req, res) => {
  const { productId } = req.params;

  // Find user's cart
  const cart = await Cart.findOne({ userId: req.user._id });
  console.log(cart);
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  // Remove item with matching productId
  cart.items = cart.items.filter((item) => !item.productId.equals(productId));
  await cart.save();
  res.status(200).json(cart); // Respond with updated cart
};

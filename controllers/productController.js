import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find(); // Fetch all products
  res.json(products);
};

// Get a product by ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id); // Find by ID
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product); // Return found product
};

// Create a new product in case if we want to (optional)
export const createProduct = async (req, res) => {
  const { name, price, description, stock } = req.body;

  // Validate input fields
  if (!name || !price || !description || !stock) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and save new product
  const product = new Product({ name, price, description, stock });
  await product.save();

  res.status(201).json(product); // Return created product
};

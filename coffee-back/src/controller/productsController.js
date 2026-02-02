import { getAllProducts } from "../model/products.js";

export const fetchAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in fetchAllProducts:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

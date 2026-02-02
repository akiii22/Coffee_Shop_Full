import {
  addNewProduct,
  deletedProductById,
  getAllProducts,
  updatedProductsId,
} from "../model/products.js";

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

export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, sizes } = req.body;

  try {
    const updatedProducts = await updatedProductsId(parseInt(id), name, sizes);
    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error("Error updating the product:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, sizes } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get image URL from Cloudinary

    if (!name || !sizes || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = await addNewProduct(name, sizes, imageUrl);

    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await deletedProductById(parseInt(id));
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product Not Found!" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error updating the product:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

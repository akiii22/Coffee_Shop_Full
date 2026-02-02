import axiosClient from "./axiosClient";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const res = await axiosClient.get("/products/product");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update product by ID
export const updateProducts = async (id, updatedProduct) => {
  try {
    const res = await axiosClient.put(
      `/products/product/${id}`,
      updatedProduct,
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add new product (with image upload)
export const addProduct = async (formData) => {
  try {
    const res = await axiosClient.post("/products/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete product by ID
export const deleteProduct = async (id) => {
  try {
    const res = await axiosClient.delete(`/products/product/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

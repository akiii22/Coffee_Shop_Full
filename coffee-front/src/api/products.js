import axiosClient from "./axiosClient";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const res = await axiosClient.get("/products/product"); // make sure endpoint matches your backend
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

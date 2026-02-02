import axiosClient from "./axiosClient";

// Add to cart
export const addToCart = async (item) => {
  try {
    const res = await axiosClient.post("/cart/", item);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get cart items
export const fetchCartItems = async () => {
  try {
    const res = await axiosClient.get("/cart/");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Remove from cart
export const removeItemFromCart = async (cart_id) => {
  try {
    const res = await axiosClient.delete(`/cart/${cart_id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

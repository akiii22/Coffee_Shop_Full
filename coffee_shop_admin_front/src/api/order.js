import axiosClient from "./axiosClient";

// Fetch all orders
export const fetchOrders = async () => {
  try {
    const res = await axiosClient.get("/orders/orders");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch order items by order ID
export const fetchOrderItems = async (orderId) => {
  try {
    const res = await axiosClient.get(`/orders/orders/${orderId}/items`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await axiosClient.put(`/orders/orders/${orderId}`, { status });
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

import axiosClient from "./axiosClient";

export const placeOrder = async () => {
  try {
    const res = await axiosClient.post("/orders/");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchOrders = async () => {
  try {
    const res = await axiosClient.get("/orders/");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

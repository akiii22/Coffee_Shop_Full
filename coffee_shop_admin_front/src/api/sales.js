import axiosClient from "./axiosClient";

// Fetch monthly sales data
export const fetchSalesData = async () => {
  try {
    const res = await axiosClient.get("/sales/monthly");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

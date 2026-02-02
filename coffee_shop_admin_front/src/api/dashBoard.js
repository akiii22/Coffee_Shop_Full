import axiosClient from "./axiosClient";

export const fetchDashboardStats = async () => {
  try {
    const res = await axiosClient.get("/dashboard/stats");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

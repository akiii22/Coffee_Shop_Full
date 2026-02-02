import axiosClient from "./axiosClient";

// Admin Login
export const adminLogin = async (credentials) => {
  try {
    const res = await axiosClient.post("/auth/login", credentials);
    localStorage.setItem("adminToken", res.data.token);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Admin Logout
export const adminLogout = () => {
  localStorage.removeItem("adminToken");
};

// Fetch All Admins
export const getAdmins = async () => {
  try {
    const res = await axiosClient.get("/auth/admins");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add New Admin
export const addAdmin = async (adminData) => {
  try {
    const res = await axiosClient.post("/auth/signup", adminData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

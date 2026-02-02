import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const fetchProducts = async () => {
  try {
    const res = await API.get("/");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

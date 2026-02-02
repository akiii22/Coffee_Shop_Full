import axiosClient from "./axiosClient";

// Sign up
export const signup = async (formData) => {
  try {
    const res = await axiosClient.post("/auth/signup", formData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login
export const logIn = async (formData) => {
  try {
    const res = await axiosClient.post("/auth/loginAuth", formData);
    const { token, user } = res.data;

    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", user.role);

    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

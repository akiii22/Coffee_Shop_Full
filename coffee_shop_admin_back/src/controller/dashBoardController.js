import {
  getTotalOrders,
  getTotalSales,
  getTotalProducts,
} from "../model/dashBoard.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await getTotalOrders();
    const totalSales = await getTotalSales();
    const totalProducts = await getTotalProducts();

    res.json({ totalOrders, totalSales, totalProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

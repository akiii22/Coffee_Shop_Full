import { getMonthlySales } from "../model/sales.js";

export const getSalesStats = async (req, res) => {
  try {
    const salesData = await getMonthlySales();
    res.json(salesData);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

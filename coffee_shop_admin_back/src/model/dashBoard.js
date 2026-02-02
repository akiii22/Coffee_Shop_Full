import db from "../config/db.js";

export const getTotalOrders = async () => {
  const result = await db.query("SELECT COUNT(*) AS total FROM orders");
  return result.rows[0].total;
};

export const getTotalSales = async () => {
  const result = await db.query(
    "SELECT COALESCE(SUM(total_price), 0) AS total_sales FROM orders WHERE status = 'completed'"
  );
  return result.rows[0].total_sales;
};

export const getTotalProducts = async () => {
  const result = await db.query("SELECT COUNT(*) AS total FROM products");
  return result.rows[0].total;
};

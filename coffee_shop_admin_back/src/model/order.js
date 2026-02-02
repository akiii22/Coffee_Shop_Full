import db from "../config/db.js";

export const getAllOrders = async () => {
  try {
    const query = `
      SELECT o.*, a.username AS customer_name 
      FROM orders o
      JOIN accounts a ON o.account_id = a.id
      ORDER BY o.created_at DESC
    `;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching orders", error.message);
    throw error;
  }
};

export const getOrderItemsByOrderId = async (orderId) => {
  try {
    const query = `
    SELECT oi.*, p.name, p.image_url
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = $1
    `;
    const result = await db.query(query, [orderId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching order items:", error.message);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const query = `
    UPDATE orders
    SET status = $1
    WHERE id = $2
    RETURNING *
    `;
    const values = [status, orderId];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating order status:", error.message);
    throw error;
  }
};

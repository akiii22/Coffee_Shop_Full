import db from "../config/db.js";

export const createOrder = async ({ account_id, total_price }) => {
  try {
    const query = `
    INSERT INTO orders(account_id, total_price, status, created_at)
    VALUES ($1, $2, 'pending', NOW())
    RETURNING *
    `;
    const values = [account_id, total_price];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw error;
  }
};

export const addOrderItems = async (orderItems) => {
  if (!orderItems || orderItems.length === 0) {
    throw new Error("No order items provided.");
  }

  const placeholders = orderItems
    .map(
      (_, i) =>
        `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`,
    )
    .join(", ");

  const query = `
    INSERT INTO order_items 
    (order_id, product_id, size, quantity, price, image_url)
    VALUES ${placeholders}
    RETURNING *;
  `;

  const values = orderItems.flatMap((item) => [
    item.order_id,
    item.product_id,
    item.size,
    item.quantity,
    item.price,
    item.image_url,
  ]);

  const result = await db.query(query, values);
  return result.rows;
};
export const getOrdersByAccountId = async (account_id) => {
  try {
    const query = `
      SELECT o.id AS order_id, o.total_price, o.status, o.created_at,
      oi.product_id, p.name AS product_name, oi.size, oi.quantity, oi.price, oi.image_url
FROM orders AS o
JOIN order_items AS oi ON o.id = oi.order_id
JOIN products AS p ON oi.product_id = p.id
WHERE o.account_id = $1
ORDER BY o.created_at DESC
    `;
    const values = [account_id];
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};

export const clearCart = async (account_id) => {
  try {
    const query = `
      DELETE FROM cart WHERE account_id = $1
    `;
    const values = [account_id];
    await db.query(query, values);
    console.log("Cart cleared successfully");
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    throw error;
  }
};

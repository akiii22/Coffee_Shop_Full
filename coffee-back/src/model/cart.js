import db from "../config/db.js";

export const addCartProducts = async ({
  account_id,
  product_id,
  quantity,
  size,
  price,
}) => {
  try {
    const query = `
    INSERT INTO cart (account_id, product_id, quantity, size, price, created_at, update_at)
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
    RETURNING *
    `;
    const values = [account_id, product_id, quantity, size, price];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    throw error;
  }
};

export const getCartProducts = async (account_id) => {
  try {
    const query = `
  SELECT c.id AS cart_id, c.quantity, c.size, c.price, 
  p.id AS product_id, p.name AS product_name, p.image_url 
FROM cart AS c 
JOIN products AS p ON c.product_id = p.id 
WHERE c.account_id = $1 
ORDER BY c.created_at DESC

  `;
    const values = [account_id];
    const results = await db.query(query, values);

    return results.rows;
  } catch (error) {
    console.error("Error fetching cart products:", error.message);
    throw error;
  }
};

export const removeCartItem = async (cart_id) => {
  try {
    const query = `
    DELETE FROM cart WHERE id = $1 RETURNING *
    `;
    const values = [cart_id];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error removing item from the cart: ", error.message);
    throw error;
  }
};

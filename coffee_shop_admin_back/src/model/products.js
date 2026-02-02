import db from "../config/db.js";

export const getAllProducts = async () => {
  try {
    const query = `SELECT * FROM products`;
    const results = await db.query(query);
    return results.rows;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

export const updatedProductsId = async (id, name, sizes) => {
  try {
    const query = `
    UPDATE products
    SET name = $1, sizes = $2
    WHERE id = $3
    RETURNING *
    `;
    const values = [name, sizes, id];
    const results = await db.query(query, values);
    return results.rows[0];
  } catch (error) {
    console.error("Error updating:", error.message);
    throw error;
  }
};

export const addNewProduct = async (name, sizes, imageUrl) => {
  try {
    const query = `
      INSERT INTO products (name, sizes, image_url, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const values = [name, sizes, imageUrl]; // Convert sizes to JSON
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw error;
  }
};

export const deletedProductById = async (id) => {
  try {
    const query = `
    DELETE FROM products WHERE id = $1
    RETURNING *
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
};

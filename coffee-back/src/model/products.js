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

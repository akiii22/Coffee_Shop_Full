import db from "../config/db.js";

export const createUser = async ({ username, email, password, role }) => {
  try {
    const query = `
      INSERT INTO accounts (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role;
    `;
    const values = [username, email, password, role];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error(error.message);
  }
};

export const findByUsername = async (username) => {
  try {
    const query = `SELECT * FROM accounts WHERE username = $1;`;
    const values = [username];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
    // console.error(error);
  }
};

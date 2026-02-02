import db from "../config/db.js";

export const createAdmin = async ({ username, email, password }) => {
  try {
    const query = `
      INSERT INTO accounts (username, email, password, role)
      VALUES ($1, $2, $3, 'admin')
      RETURNING id, username, email, role;
    `;
    const values = [username, email, password];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findByAdminUsername = async (username) => {
  try {
    const query = `SELECT * FROM accounts WHERE username = $1 AND role = 'admin';`;
    const values = [username];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAdmins = async () => {
  try {
    const query = `SELECT id, username, email FROM accounts WHERE role = 'admin'`;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

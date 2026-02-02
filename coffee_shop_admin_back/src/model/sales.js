import db from "../config/db.js";

export const getMonthlySales = async () => {
  const query = `
    SELECT 
      TO_CHAR(created_at, 'Mon') AS month, 
      SUM(total_price) AS sales
    FROM orders
    WHERE status = 'completed'
    GROUP BY month
    ORDER BY MIN(created_at);
  `;

  const { rows } = await db.query(query);
  return rows;
};

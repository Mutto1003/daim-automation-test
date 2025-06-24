// db/commonQueries.ts
import { queryDB } from './query';

export const getUserByEmail = async (email: string) => {
  const sql = `SELECT * FROM users WHERE username = ?`;
  return queryDB(sql, [email]);
};

export const getOrdersByUserId = async (userId: number) => {
  const sql = `SELECT * FROM orders WHERE user_id = ?`;
  return queryDB(sql, [userId]);
};

export const getOrders = async ({userId, status, ...rest}: {userId: number; status: string;}) => {
  const sql = `
    SELECT ...
    WHERE user_id = ? AND status = ?
  `;
  return queryDB(sql, [userId, status]);
};

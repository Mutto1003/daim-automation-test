import { createConnection } from './connection';

export async function queryDB(sql: string, values?: any[]) {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } finally {
    await connection.end();
  }
}
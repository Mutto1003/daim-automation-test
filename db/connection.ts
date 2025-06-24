import mysql from 'mysql2/promise';
import { dbConfig, isDbEnabled } from './config';

export async function createConnection() {
  if (!isDbEnabled) {
    throw new Error('❌ Database is disabled (DB_ENABLED is false)');
  }

  return await mysql.createConnection(dbConfig);
}
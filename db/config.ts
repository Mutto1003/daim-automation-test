export const isLocal = process.env.RUNNING_LOCALLY === 'true';
export const isDbEnabled = process.env.DB_ENABLED === 'true';

export const dbConfig = {
  host: isLocal ? 'localhost' : process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: isLocal ? parseInt(process.env.DB_PORT || '3306', 10) : undefined,
};
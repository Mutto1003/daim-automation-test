import { createConnection } from './connection';

export async function initializeDB() {
  const connection = await createConnection();
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [rows]: any = await connection.execute('SELECT * FROM users WHERE username = ?', ['Admin']);
    if (Array.isArray(rows) && rows.length === 0) {
      await connection.execute(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        ['Admin', 'admin123', 'admin@example.com']
      );
      console.log('✅ Admin user created');
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}
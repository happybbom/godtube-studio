// models/userModel.ts
import pool from '../db.ts';

export async function getAllUsers() {
  const result = await pool.query(`
    SELECT id, name as username, name as firstname, email, role, reg_dt
    FROM users
  `);
  return result.rows;
}

export async function getUserById(id: number) {
  const result = await pool.query(
    'SELECT id, name as username, name as firstname, email, role, reg_dt FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

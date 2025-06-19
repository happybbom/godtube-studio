/*
import dotenv from 'dotenv';
dotenv.config();   // 반드시 최상단에서 호출, DB 연결 코드보다 먼저 호출되어야 합니다

import pg from 'pg';

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;
*/

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  /*ssl: {
    rejectUnauthorized: false, // Railway는 SSL 연결 필요
  },*/
});

export default pool;

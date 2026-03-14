import dotenv from 'dotenv';
dotenv.config();


import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,       // TODO directly use "DB_URL from index.mjs ?"
  ssl: { rejectUnauthorized: false }, // needed Render
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

export default pool;    
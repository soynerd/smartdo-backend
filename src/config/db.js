import pg from 'pg';
import credentials from './config.js';

const { Client } = pg;

const db = new Client({
  connectionString: credentials.database.url,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("✅ Connected to Neon with SSL");
  }
});

export default db;

// db.js
import pg from 'pg';
import credentials from './config.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: credentials.database.url,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

// Optional: test query to confirm connection
pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Connected to Neon with SSL');
    console.log('📅 Server time:', res.rows[0].now);
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.stack);
    process.exit(1);
  });

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(1);
});

export default pool;

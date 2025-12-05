const mysql = require('mysql2');

// Log environment variables for debugging (excluding password for security)
console.log("DB Config - HOST:", process.env.DB_HOST);
console.log("DB Config - USER:", process.env.DB_USER);
console.log("DB Config - NAME:", process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Add event listeners for connection pool debugging
pool.on('acquire', function (connection) {
  console.log('Database Connection %d acquired from pool.', connection.threadId);
});

pool.on('release', function (connection) {
  console.log('Database Connection %d released back to pool.', connection.threadId);
});

pool.on('error', function (err) {
  console.error('Database Pool Error: ', err.message, 'Code:', err.code);
});

module.exports = pool.promise();
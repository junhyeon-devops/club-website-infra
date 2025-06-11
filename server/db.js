const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql', // 반드시 docker-compose의 서비스명과 일치해야 함
  user: 'root',
  password: 'pda1234',
  database: 'pda_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

module.exports = pool;

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql', // �ݵ�� docker-compose�� ���񽺸�� ��ġ�ؾ� ��
  user: 'root',
  password: 'pda1234',
  database: 'pda_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

module.exports = pool;

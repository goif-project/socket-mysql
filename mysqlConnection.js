const mysql = require('mysql');

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'jack50611',
  database: 'golf_db'
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;

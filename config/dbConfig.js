const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "iamabhi@1509",
  database: "your_database",
});

module.exports = pool;

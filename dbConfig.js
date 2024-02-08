const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "your_database",
});

module.exports = pool;

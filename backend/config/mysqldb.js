const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.SQLHOST,
  user: process.env.USER,
  password: process.env.PASSSWORD,
  database: process.env.DATABASEINDEED,
  port: 3306,
  debug: false,
  connectionLimit: 100,
  multipleStatements: true,
});

module.exports = { pool };

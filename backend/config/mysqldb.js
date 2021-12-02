const mysql = require("mysql");
require("dotenv").config();

// const pool = mysql.createPool({
//   host: "indeed.cxz6a21rgeds.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "12345678",
//   database: "indeed",
//   port: 3306,
//   debug: false,
//   connectionLimit: 100,
//   multipleStatements: true,
// });
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

const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  host: "database-1.cgpwh4cefk7y.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "dontaskmypassword",
  database: "indeed",
  port: 3306,
  debug: false,
  connectionLimit: 100,
  multipleStatements: true,
});
// const pool = mysql.createPool({
//   host: process.env.SQLHOST,
//   user: process.env.USER,
//   password: process.env.PASSSWORD,
//   database: process.env.DATABASEINDEED,
//   port: 3306,
//   debug: false,
//   connectionLimit: 100,
//   multipleStatements: true,
// });

module.exports = { pool };

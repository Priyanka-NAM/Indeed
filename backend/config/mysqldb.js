const mysql = require("mysql");

const pool = mysql.createPool({
  host: "indeed.cgpwh4cefk7y.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "dontaskmypassword",
  database: "indeed",
  port: 3306,
  debug: false,
  connectionLimit: 100,
  multipleStatements: true,
});

module.exports = { pool };

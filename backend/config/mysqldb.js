const mysql = require('mysql')

const pool = mysql.createPool({
  host: 'indeed.cxz6a21rgeds.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'indeed',
  port: 3306,
  debug: false,
  connectionLimit: 100,
  multipleStatements: true,
})

module.exports = {pool}

/* 
@ POST
/api/users/signup
User Signup Route
<<<<<<< HEAD
 */
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const { pool } = require("../config/mysqldb");
const createEmployer = require("../controllers/EmployerController");
const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  pool.getConnection((err, conn) => {
    if (err) {
      res.send("Error occured");
=======
 */ 
const User = require("../Models/UserModel")
const bcrypt = require("bcryptjs")
const {pool} = require('../config/mysqldb')

console.log(pool)

const createEmployer = require('../controllers/EmployeeController')
const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  
  pool.getConnection(async (err, conn) => {
    if (err) {
      res.send('Error occurred!');
>>>>>>> 1c1b7a2f9007c42b16f19c56b90773249425153c
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      conn.query(
<<<<<<< HEAD
        "INSERT INTO users (email, password, role) VALUES (?,?,?)",
        [email, password, role],
=======
        'INSERT INTO users (email, password, role) VALUES (?,?,?)',
        [email, hashedPassword, role],
>>>>>>> 1c1b7a2f9007c42b16f19c56b90773249425153c
        (error, insertResult) => {
          if (error) {
            return res.status(400).json({
              msg: error,
            });
          }
<<<<<<< HEAD
          createMongoUser(req, res, insertResult.insertId);

=======
            createMongoUser(req, res, insertResult.insertId)
>>>>>>> 1c1b7a2f9007c42b16f19c56b90773249425153c
          conn.release();
        }
      );
    }
<<<<<<< HEAD
  });
};

// get the data from request body which is in json and put it in variables called user and password
const createMongoUser = async (req, res, insertId) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status("400");
    throw new Error("User Already exists");
  } else {
    //const salt = await bcrypt.genSalt(10);
    //const Hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      userId: insertId,
      email,
    });
=======
  })
} 
  
  // get the data from request body which is in json and put it in variables called user and password
  const createMongoUser = async (req, res, insertId) => {
    const {email} = req.body
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status("400");
      throw new Error("User Already exists");
    } else {
      const user = await User.create({
        userId : insertId,
        email
      });
>>>>>>> 1c1b7a2f9007c42b16f19c56b90773249425153c

    if (user) {
      console.log("Created!");
      res.status(201).json({
        user,
      });
    } else {
      res.status("400");
      throw new Error("400 Bad Request: Please try again later. ");
    }
  }
};

module.exports = createUser;

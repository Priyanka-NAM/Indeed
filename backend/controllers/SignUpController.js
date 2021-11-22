/* 
@ POST
/api/users/signup
User Signup Route
 */ 
const User = require("../Models/UserModel")
const bcrypt = require("bcryptjs")
const {pool} = require('../config/mysqldb')



const createEmployer = require('../controllers/EmployerController')

const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  console.log("req data", email, password, role)
  pool.getConnection(async (err, conn) => {
    if (err) {
      res.send('Error occurred!');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      conn.query(
        'INSERT INTO users (email, password, role) VALUES (?,?,?)',
        [email, hashedPassword, role],
        (error, insertResult) => {
          if (error) {
            return res.status(500).json({
              msg: error,
            });
          }
            createMongoUser(req, res, insertResult.insertId)
          conn.release();
        }
      );
    }
  })
} 
  
  // get the data from request body which is in json and put it in variables called user and password
  const createMongoUser = async (req, res, insertId) => {
    const {email} = req.body
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(201).send("user already exists");
      throw new Error("User Already exists");
    } else {
      const user = await User.create({
        userId : insertId,
        email
      });

    if (user) {
      console.log("Created!");
      res.status(200).send("user created")
    } else {
      res.status(500).send("database error");
      throw new Error("Database error: Please try again later. ");
    }
  }
};

module.exports = createUser;

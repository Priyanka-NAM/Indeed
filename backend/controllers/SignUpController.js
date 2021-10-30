/* 
@ POST
/api/users/signup
User Signup Route
 */ 
const User = require("../Models/UserModel")
const bcrypt = require("bcryptjs")
const {pool} = require('../config/mysqldb')

console.log(pool,"---")
const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'INSERT INTO users (email, password, role) VALUES (?,?,?)',
        [email, password, role],
        (error, insertResult) => {
          if (error) {
            return res.status(400).json({
              "msg" : error
            });
          }
          createMongoUser(req, res, insertResult.insertId)
          
          conn.release();
        },
      );
    }
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
      //const salt = await bcrypt.genSalt(10);
      //const Hashedpassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        userId : insertId,
        email
      });

      if (user) {
        console.log("Created!");
        res.status(201).json({
          user
        });
      } else {
        res.status("400");
        throw new Error("400 Bad Request: Please try again later. ");
      }
    }
  }
  


module.exports = createUser;

const User = require("../Models/UserModel");
const { auth } = require("../config/passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { pool } = require("../config/mysqldb");

const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  pool.getConnection(async (err, conn) => {
    if (err) {
      res.send("Error occured");
    } else {
      conn.query(
        "SELECT * FROM users where email=?",
        [email],
        async (error, result) => {
          if (error) {
            return res.status(500).json({
              msg: error,
            });
          }
          if (result[0]) {
            let isValid = false;
            let results = {};
            try {
              isValid = await bcrypt.compare(password, result[0].password);
            } catch (error) {
              console.log(error);
            }
            if (isValid) {
              const payload = { _id: result[0].userId, email: result[0].email };
              const token = jwt.sign(payload, process.env.secret, {
                expiresIn: 1008000,
              });
              let moongoresults = await User.findOne({
                userId: result[0].userId,
              });
              results["JWT"] = token;
              results["email"] = result[0].email;
              results["userId"] = moongoresults._id;

              res.status(200).send(results);
            } else {
              res.send("Unauthorized");
            }
          } else {
            res.send("Resource not found");
          }
          conn.release();
        }
      );
    }
  });
};

module.exports = loginUser;

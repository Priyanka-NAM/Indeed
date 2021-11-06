const User = require('../Models/UserModel')
const { auth } = require('../config/passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const {pool} = require('../config/mysqldb')

const loginUser = (req, res) => {
    const {email, password} = req.body
    pool.getConnection(async (err, conn) => {
        if (err) {
          res.send('Error occured');
        } else {
            let isValid = false
            try {
                isValid = await bcrypt.compare(password, user.password)
            } catch(error) {
                console.log(error)
            } 
            if (isValid) {
                const payload = { _id: user._id, username: user.username};
                const token = jwt.sign(payload, process.env.secret, {
                    expiresIn: 1008000
                });
                callback(null, "JWT" + token)
            }
          conn.query(
            'SELECT * FROM users WHERE email=?',
            [email],
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

    User.findOne({ username: msg.username }, async (error, user) => {
        if (error) {
            callback(null, "500")
        }
        let isValid = false
        try {
            isValid = await bcrypt.compare(msg.password, user.password)
        } catch(error) {
            console.log(error)
        } 
        if (isValid) {
            const payload = { _id: user._id, username: user.username};
            const token = jwt.sign(payload, process.env.secret, {
                expiresIn: 1008000
            });
            callback(null, "JWT" + token)
        }
        else {
            callback(null, "401")
        }
    })
}

async function handle_request (msg, callback) {
    User.findOne({ username: msg.username }, async (error, user) => {
        if (error) {
            callback(null, "500")
        }
        let isValid = false
        try {
            isValid = await bcrypt.compare(msg.password, user.password)
        } catch(error) {
            console.log(error)
        } 
        if (isValid) {
            const payload = { _id: user._id, username: user.username};
            const token = jwt.sign(payload, process.env.secret, {
                expiresIn: 1008000
            });
            callback(null, "JWT" + token)
        }
        else {
            callback(null, "401")
        }
    })
}

module.exports.handle_request = handle_request

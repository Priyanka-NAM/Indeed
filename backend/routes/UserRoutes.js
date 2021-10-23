const express = require('express')
const router = express.Router()
const createUser = require('../controllers/SignUpController')


console.log("First push");

router.post('/signup',createUser) 
module.exports = router 
const express = require('express')
const router = express.Router()
const addemployer = require('../controllers/EmployeeController')


router.post('/addemployer',addemployer) 
module.exports = router 
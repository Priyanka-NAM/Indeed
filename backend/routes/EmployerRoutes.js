const express = require('express')
const router = express.Router()
const addemployer = require('../controllers/EmployeeController')

router.post('/signup',addemployer) 
router.post('/addemployer',addemployer) 
module.exports = router 
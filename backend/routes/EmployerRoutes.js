const express = require('express')
const router = express.Router()
const {createEmployer,updateEmployer} = require('../controllers/EmployerController')

router.post('/signup',createEmployer) 
router.post('/addemployer',updateEmployer) 
router.post('/updateemployer',updateEmployer) 
module.exports = router 
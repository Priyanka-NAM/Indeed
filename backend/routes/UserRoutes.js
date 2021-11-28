const express = require('express')
const fetchJobs = require('../controllers/FetchAllJobsController')
const router = express.Router()
const createUser = require('../controllers/SignUpController')
const loginUser = require('../controllers/UserLoginController')
const checkIsAdmin = require('../controllers/checkIsAdmin')

router.post('/public/signup',createUser)
router.post('/public/login', checkIsAdmin, loginUser)
router.get('/public/jobs', fetchJobs)

module.exports = router  
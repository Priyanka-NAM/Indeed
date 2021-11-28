const express = require('express')
const fetchJobs = require('../controllers/FetchAllJobsController')
const router = express.Router()
const createUser = require('../controllers/SignUpController')
const { updateUserSavedJobs } = require('../controllers/UserDetailsController')
const loginUser = require('../controllers/UserLoginController')

router.post('/public/signup',createUser)
router.post('/public/login', loginUser)
router.get('/public/jobs', fetchJobs)
router.post('/user-details', updateUserSavedJobs)

module.exports = router  
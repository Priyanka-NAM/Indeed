const express = require('express')
const fetchJobs = require('../controllers/FetchAllJobsController')
const router = express.Router()
const createUser = require('../controllers/SignUpController')

router.post('/public/signup',createUser)
router.get('/public/jobs', fetchJobs)

module.exports = router  
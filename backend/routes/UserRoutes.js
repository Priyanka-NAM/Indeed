const express = require('express')
const fetchJobs = require('../controllers/FetchAllJobsController')
const router = express.Router()
const createUser = require('../controllers/SignUpController')
const { updateUserSavedJobs, deleteUserSavedJobs, getUserSavedJobs, getUserReviews } = require('../controllers/UserDetailsController')
const { postJob } = require('../controllers/ApplyJobController')
const loginUser = require('../controllers/UserLoginController')
const checkIsAdmin = require('../controllers/checkIsAdmin')

router.post('/public/signup',createUser)
router.post('/public/login', checkIsAdmin, loginUser)
router.get('/public/jobs', fetchJobs)
router.post('/saved-jobs', updateUserSavedJobs)
router.delete('/saved-jobs', deleteUserSavedJobs)
router.get('/saved-jobs', getUserSavedJobs)
router.get('/reviews', getUserReviews)
router.post('/apply-job', postJob)

module.exports = router  
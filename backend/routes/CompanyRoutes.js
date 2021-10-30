const express = require('express')
const { getUserReviews } = require('../controllers/UserReviewController')
const { postUserReview } = require('../controllers/UserReviewController')
const userSalary = require('../controllers/UserSalaryController')
const router = express.Router()

router.post('/user-review', postUserReview)
router.get('/user-review', getUserReviews)
router.post('/user-salary', userSalary)

module.exports = router

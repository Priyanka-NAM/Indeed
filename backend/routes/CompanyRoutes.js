const express = require('express')
const { getUserReviews, findReviewById, postUserReview, getAllReviews, UpdateReviewStatus} = require('../controllers/UserReviewController')
const userSalary = require('../controllers/UserSalaryController')
const router = express.Router();

router.param('reviewId', findReviewById);
router.post('/user-review', postUserReview)
router.get('/user-review', getUserReviews)
router.post('/user-salary', userSalary)
router.get('/reviews', getAllReviews)
router.put('/review/:reviewId', UpdateReviewStatus)

module.exports = router

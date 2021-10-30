const Reviews = require('../Models/ReviewsModel')

const postUserReview = async (req, res) => {
    const {overallRating, reviewSummary, yourReview, pros, cons, isApproved, isFeatured, interviewPreparation} = req.body
    const usersReview = await Reviews.create({
        overallRating,
        reviewSummary,
        yourReview,
        pros,
        cons,
        isApproved,
        isFeatured,
        interviewPreparation
    })
    const data = {
        _id : usersReview._id,
        reviewSummary: usersReview.reviewSummary
    }
    res.status(200).send(data)
}

const getUserReviews = async (req, res) => {
    const reviews = await Reviews.find({})
    res.status(200).send(reviews)
}

module.exports = {postUserReview, getUserReviews}

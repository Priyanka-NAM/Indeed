const mongoose = require('mongoose') 

const reviewSchema = mongoose.Schema({
    // reviewId: {
    //     type: String,
    //     required: true
    // },
    overallRating: {
        type: String
    },
    // employerId: {
    //     type: String
    // },
    // userId: {
    //     type: String
    // },
    reviewSummary: {
        type: String
    },
    yourReview: {
        type: String
    },
    pros: {
        type: String
    },
    cons: {
        type: String
    },
    isApproved: {
        type: String
    },
    isHelpful: {
        type: Boolean
    },
    isFeatured: {
        type: Boolean
    },
    interviewPreparation: {
        type: String
    }
    },{timestamps:true})
    
    const Reviews = mongoose.model('Reviews',reviewSchema) 
    module.exports = Reviews

const mongoose = require('mongoose') 

const reviewSchema = mongoose.Schema({
    overallRating: {
        type: String
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
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
        type: String,
        default:"NotApproved"
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

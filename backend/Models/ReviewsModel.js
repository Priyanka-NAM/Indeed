const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    overallRating: {
      type: Number,
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewTitle: {
      type: String,
    },
    reviewRole: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    workHappinessScore: {
      type: Number,
    },
    learningScore: {
      type: Number,
    },
    appreciationScore: {
      type: Number,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    reviewerRole: {
      type: String,
    },
    reviewSummary: {
      type: String,
    },
    yourReview: {
      type: String,
    },
    pros: {
      type: String,
    },
    cons: {
      type: String,
    },
    isApproved: {
      type: String,
      default: "NotApproved",
    },
    isHelpfulCount: {
      type: Number,
    },
    isFeatured: {
      type: Boolean,
    },
    interviewPreparation: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", reviewSchema);
module.exports = Reviews;

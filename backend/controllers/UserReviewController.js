const Reviews = require("../Models/ReviewsModel");
const Employer = require("../Models/EmployerModel");
const User = require("../Models/UserModel");

const kafka = require("../kafka/client");

exports.postUserReview = async (req, res) => {
  console.log("Post User Review");
  kafka.make_request("post_review", req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};
exports.findReviewById = async (req, res, next, id) => {
  try {
    const review = await Reviews.findById(id);
    req.review = review;
    if (!review) {
      return res.status(400).json({
        error: error,
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

exports.getUserReviews = async (req, res) => {
  console.log("User Reviews");
  kafka.make_request("user_review", req.query, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getSpecificCompanyReviews = async (req, res) => {
  console.log("Company Specific Review");
  kafka.make_request("company_specific_review", req.query, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getAllReviews = async (req, res) => {
  console.log("get all reviews");
  kafka.make_request("get_all_reviews", req.query, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getCompanyReviews = async (req, res) => {
  console.log("get all company reviews");
  kafka.make_request("company_review", req.query, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.UpdateReviewStatus = async (req, res) => {
  console.log("update review");
  kafka.make_request("update_review", req.query, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.UpdateHelpfulCount = async (req, res) => {
  console.log("Update Helpful Count");
  kafka.make_request("update_helpful_count", req.query, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};

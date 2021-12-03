const Reviews = require("../Models/ReviewsModel");
const Employer = require("../Models/EmployerModel");
const User = require("../Models/UserModel");
const redisClient = require('../config/redisClient');

exports.postUserReview = async (req, res) => {
  console.log("Post User Review");
  const {
    overallRating,
    workHappinessScore,
    learningScore,
    appreciationScore,
    reviewRole,
    reviewTitle,
    city,
    state,
    reviewSummary,
    yourReview,
    pros,
    cons,
    isApproved,
    isFeatured,
    interviewPreparation,
    userId,
    employerId,
  } = req.body;
  const newReview = new Reviews({
    overallRating,
    reviewSummary,
    reviewTitle,
    reviewRole,
    workHappinessScore,
    learningScore,
    appreciationScore,
    city,
    state,
    yourReview,
    pros,
    cons,
    isApproved,
    isFeatured,
    interviewPreparation,
    userId,
    employerId,
  });
  await newReview.save((err, result) => {
    if (err) {
      throw err;
    }
  });
  const key = employerId.toString() + 'isHelpful'
  if (newReview) {
    const reviews = await Reviews.find({ employerId }).sort({
      isHelpfulCount: -1,
    });
    if (reviews) {
      redisClient.setEx(key, 36000, JSON.stringify(reviews));
    }
  }
  console.log(employerId);
  let emp = await Employer.findById(employerId);
  let averageWorkHappinessScore = 0;
  let averageRating = 0;
  let averageLearningScore = 0;
  let averageAppreciationScore = 0;
  emp.noOfRatings = emp.noOfRatings + 1;

  averageRating =
    (emp.averageRating * (emp.noOfRatings - 1) + parseInt(overallRating)) /
    emp.noOfRatings;
  averageWorkHappinessScore =
    (((emp.averageWorkHappinessScore / 20) * (emp.noOfRatings - 1) +
      parseInt(workHappinessScore)) /
      emp.noOfRatings) *
    20;
  averageLearningScore =
    (((emp.averageLearningScore / 20) * (emp.noOfRatings - 1) +
      parseInt(learningScore)) /
      emp.noOfRatings) *
    20;
  averageAppreciationScore =
    (((emp.averageAppreciationScore / 20) * (emp.noOfRatings - 1) +
      parseInt(appreciationScore)) /
      emp.noOfRatings) *
    20;

  emp.averageRating = averageRating.toFixed(2);
  emp.averageWorkHappinessScore = averageWorkHappinessScore.toFixed(2);
  emp.averageLearningScore = averageLearningScore.toFixed(2);
  emp.averageAppreciationScore = averageAppreciationScore.toFixed(2);
  console.log(emp.averageRating);

  emp.save((err) => {
    if (err) throw err;
  });

  res.status(200).send(newReview);
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
  console.log("inside");
  try {
    const review = await Reviews.find({ userId: req.query.userId });
    req.review = review;
    if (!review) {
      return res.status(400).json({
        error: error,
      });
    }
    res.send(review);
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

exports.getSpecificCompanyReviews = async (req, res) => {
  const sortVal = req.query.sort ? req.query.sort : "createdAt";
  const employerId = req.query.employerId
  try {
    let review;
    if (sortVal === "overallRating") { 
       review = await Reviews.find({ employerId: req.query.employerId }).sort({
        overallRating: -1,
      });
    }
    else if (sortVal === "isHelpfulCount") {
      try {
        const key = employerId.toString() + 'isHelpful'
        console.log(key)
        const data = await redisClient.get(key)
        if (data) {
          console.log("get key")
          return res.status(200).send(JSON.parse(data))
        } else {
          console.log("set key")
          const reviews = await Reviews.find({ employerId: req.query.employerId }).sort({
            isHelpfulCount: -1,
          });
          if (reviews) {
            redisClient.setEx(key, 36000, JSON.stringify(reviews));
            return res.status(200).send(reviews);
          } else {
            return res.status(400).json({
              error: error
            });
          }
        }
      } catch (err) {
        console.log(error)
        return res.status(500).json({
          error: error
        });
      }
    }
    else {
      console.log("here")
      review = await Reviews.find({ employerId: req.query.employerId }).sort({
        createdAt: -1,
      });
      if (!review) {
        return res.status(400).json({
          error: error,
        });
      }
      res.status(200).send(review)
  }
  } catch (err) {
    res.status(500).send(err)
  }
};

exports.getAllReviews = async (req, res) => {
  console.log("get all reviews");
  try {
    const review = await Reviews.find({});
    if (!review) {
      console.log("error");
      return res.status(400).json({
        error: error,
      });
    }
    res.send(review);
  } catch (error) {
    console.log("error");
    return res.status(400).json({
      error: error,
    });
  }
};

exports.getCompanyReviews = async (req, res) => {
  console.log("get all company reviews");
  let location = req.query.location;
  let companyName = req.query.company;
  console.log(location);
  console.log(companyName);

  try {
    let companies = [];
    if (location && companyName) {
      companies = await Employer.find({
        $and: [
          { city: { $eq: location } },
          { companyName: { $eq: companyName } },
        ],
      });
    } else {
      companies = await Employer.find({
        $or: [
          { city: { $eq: location } },
          { companyName: { $eq: companyName } },
        ],
      });
    }

    let companyNames = [];
    companies.forEach((company) => {
      companyNames.push({
        companyName: company.companyName,
        rating: company.averageRating,
        id: company._id,
        noOfRatings: company.noOfRatings,
      });
    });
    res.send({ companyNames });
  } catch (error) {
    console.log("error");
    return res.status(400).json({
      error: error,
    });
  }
};

exports.UpdateReviewStatus = async (req, res) => {
  console.log(req.query.employerId)
  try {
    const review = await Reviews.findOneAndUpdate(
      { _id: req.body.reviewid },
      { isApproved: "Approved" }
    );
    if (review) {
      const key = req.query.employerId.toString()+'isHelpful'
      const updatedReviews = await Reviews.find({ employerId: req.query.employerId }).sort({
        isHelpfulCount: -1,
      });
      if (updatedReviews) {
        redisClient.setEx(key, 36000, JSON.stringify(updatedReviews));
        //return res.status(200).send(review);
      }
    }
    if (!review) {
      return res.status(400).json({
        error: error,
      });
    }
    const user = await User.findById(review.userId);
    user.noOfAcceptedReviews = user.noOfAcceptedReviews + 1;
    user.save();
    res.send(review);
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

exports.UpdateHelpfulCount = async (req, res) => {
  console.log(req.query);
  try {
    const review = await Reviews.findOneAndUpdate(
      { _id: req.body.reviewid },
      {
        isHelpfulCount: req.body.helpfulcount,
        isNotHelpfulCount: req.body.nothelpfulcount,
      }
    );
    if (review) {
      const key = req.query.employerId.toString()+'isHelpful'
      const updatedReviews = await Reviews.find({ employerId: req.query.employerId }).sort({
        isHelpfulCount: -1,
      });
      if (updatedReviews) {
        redisClient.setEx(key, 36000, JSON.stringify(updatedReviews));
        //return res.status(200).send(review);
      }
    }
    
    if (!review) {
      return res.status(400).json({
        error: error,
      });
    }
    res.status(200).send(review);
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

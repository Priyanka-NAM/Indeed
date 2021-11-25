const Reviews = require("../Models/ReviewsModel");
const Employer = require("../Models/EmployerModel");

exports.postUserReview = async (req, res) => {
  console.log("Post User Review");
  const {
    overallRating,
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
  let emp = await Employer.findById(employerId);

  emp.noOfRatings = emp.noOfRatings + 1;

  emp.averageRating =
    (emp.averageRating * (emp.noOfRatings - 1) + parseInt(overallRating)) /
    emp.noOfRatings;
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
  try {
    const review = await Reviews.find({ user: req.body.id }).populate("user");
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
  try {
    const review = await Reviews.find({ employerId: req.query.employerId });
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

exports.getAllReviews = async (req, res) => {
  console.log("get all reviews");
  try {
    const review = await Reviews.find({});
    req.review = review;
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
  console.log(req.review);
  try {
    const review = await Reviews.findOneAndUpdate(
      { _id: req.review._id },
      { isApproved: req.body.isApproved }
    );
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

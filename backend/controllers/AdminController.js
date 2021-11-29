const Employer = require("../Models/EmployerModel");
const User = require("../Models/UserModel");


exports.getTopRatedCompanies = async (req, res) => {
    try {
      const review = await Employer.find({}).sort({averageRating : -1}).limit(5);
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

  exports.getTopReviewedCompanies = async (req, res) => {
    try {
      const review = await Employer.find({}).sort({noOfRatings : -1}).limit(5);
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
  exports.getTopAcceptedReviewUsers = async (req, res) => {
    try {
      const review = await User.find({}).sort({noOfAcceptedReviews : -1}).limit(5);
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

  exports.getTopRatedCEOs = async (req, res) => {
    try {
      const review = await Employer.find({}).sort({averageRating : -1}).limit(10);
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


  exports.getAllComapnies = async (req, res) => {
    try {
      const review = await Employer.find({});
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
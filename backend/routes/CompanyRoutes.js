const express = require("express");
const {
  getUserReviews,
  findReviewById,
  postUserReview,
  getAllReviews,
  UpdateReviewStatus,
  getCompanyReviews,
  getSpecificCompanyReviews,
} = require("../controllers/UserReviewController");
const userSalary = require("../controllers/UserSalaryController");
const getHomePage = require("../controllers/CompanyHomePage");
const router = express.Router();

router.param("reviewId", findReviewById);
router.post("/user-review", postUserReview);
router.get("/user-review", getUserReviews);
router.get("/company-specific-reviews", getSpecificCompanyReviews);
router.post("/user-salary", userSalary);
router.get("/reviews", getAllReviews);
router.get("/home", getHomePage);
router.get("/whyjoinus", getHomePage);
router.put("/review/:reviewId", UpdateReviewStatus);
router.get("/companyreviews", getCompanyReviews);

module.exports = router;

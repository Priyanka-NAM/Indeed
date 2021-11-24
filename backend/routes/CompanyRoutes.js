const express = require("express");
const {
  getUserReviews,
  findReviewById,
  postUserReview,
  getAllReviews,
  UpdateReviewStatus,
  getCompanyReviews,
} = require("../controllers/UserReviewController");
const userSalary = require("../controllers/UserSalaryController");
const getHomePage = require("../controllers/CompanyHomePage");
const router = express.Router();

router.param("reviewId", findReviewById);
router.post("/user-review", postUserReview);
router.get("/user-review", getUserReviews);
router.post("/user-salary", userSalary);
router.get("/reviews", getAllReviews);
router.get("/home", getHomePage);
router.get("/whyjoinus", getHomePage);
router.put("/review/:reviewId", UpdateReviewStatus);
router.get("/companyreviews", getCompanyReviews);

module.exports = router;

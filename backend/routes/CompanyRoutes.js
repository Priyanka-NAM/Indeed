const express = require("express");
const {
  getUserReviews,
  findReviewById,
  postUserReview,
  getAllReviews,
  UpdateReviewStatus,
  getCompanyReviews,
  getSpecificCompanyReviews,
  UpdateHelpfulCount,
} = require("../controllers/UserReviewController");
const userSalary = require("../controllers/UserSalaryController");
const getHomePage = require("../controllers/CompanyHomePage");
const { uploadPhoto, updatePhotoStatus} = require("../controllers/UserPhotoController");
const router = express.Router();

router.param("reviewId", findReviewById);
router.post("/user-review", postUserReview);
router.get("/user-review", getUserReviews);
router.get("/company-specific-reviews", getSpecificCompanyReviews);
router.post("/user-salary", userSalary);
router.get("/reviews", getAllReviews);
router.get("/home", getHomePage);
router.get("/whyjoinus", getHomePage);
router.put("/review/update-review-status", UpdateReviewStatus);
router.put("/review/update-helpful-count", UpdateHelpfulCount);
router.get("/companyreviews", getCompanyReviews);
router.post("/uploadphoto", uploadPhoto);
router.put("/update-photo-status", updatePhotoStatus);
module.exports = router;


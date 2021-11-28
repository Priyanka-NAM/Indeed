const express = require("express");
const {
 
    getTopRatedCompanies,
    getTopReviewedCompanies,
    getTopAcceptedReviewUsers,
  
} = require("../controllers/AdminController");
const router = express.Router();

router.get("/get-top-ratedcomapnies", getTopRatedCompanies);
router.get("/get-top-reviewedcomapnies", getTopReviewedCompanies);
router.get("/get-top-acceptedreview-users", getTopAcceptedReviewUsers);

module.exports = router;

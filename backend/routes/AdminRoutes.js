const express = require("express");
const {
 
    getTopRatedCompanies,
    getTopReviewedCompanies,
    getTopAcceptedReviewUsers,
    getTopRatedCEOs,
  
} = require("../controllers/AdminController");
const router = express.Router();

router.get("/get-top-ratedcomapnies", getTopRatedCompanies);
router.get("/get-top-reviewedcomapnies", getTopReviewedCompanies);
router.get("/get-top-acceptedreview-users", getTopAcceptedReviewUsers);
router.get("/get-top-rated-ceos", getTopRatedCEOs);

module.exports = router;

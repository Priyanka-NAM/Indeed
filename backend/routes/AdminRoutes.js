const express = require("express");
const {
 
    getTopRatedCompanies,
    getTopReviewedCompanies,
    getTopAcceptedReviewUsers,
    getTopRatedCEOs,
    getAllComapnies,
  
} = require("../controllers/AdminController");
const router = express.Router();

router.get("/get-top-ratedcomapnies", getTopRatedCompanies);
router.get("/get-top-reviewedcomapnies", getTopReviewedCompanies);
router.get("/get-top-acceptedreview-users", getTopAcceptedReviewUsers);
router.get("/get-top-rated-ceos", getTopRatedCEOs);
router.get("/get-all-companies", getAllComapnies);

module.exports = router;

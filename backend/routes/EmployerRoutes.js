const express = require("express");
const router = express.Router();
const {
  createMongoEmployer,
  updateEmployer,
  getEmployerDetails,
  companyPicsUpload,
} = require("../controllers/EmployerController");
const employerHomePage = require("../controllers/EmployerHomePage");

router.post("/updateemployer", updateEmployer);
router.get("/employerdetails/:employerID", getEmployerDetails);
router.get("/home", employerHomePage);
router.post("/employer_pic_upload", companyPicsUpload);

module.exports = router;

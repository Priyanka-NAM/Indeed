const express = require("express");
const router = express.Router();
const {
  createMongoEmployer,
  updateEmployer,
  getEmployerDetails,
} = require("../controllers/EmployerController");
const employerHomePage = require("../controllers/EmployerHomePage");

// router.post('/signup',createEmployer)
// router.post("/addemployer", createMongoEmployer);
router.post("/updateemployer", updateEmployer);
router.get("/employerdetails/:employerID", getEmployerDetails);
router.get("/home", employerHomePage);

module.exports = router;

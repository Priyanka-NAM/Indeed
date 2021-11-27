const express = require("express");
const router = express.Router();
const {
  createMongoEmployer,
  updateEmployer,
} = require("../controllers/EmployerController");
const employerHomePage = require("../controllers/EmployerHomePage");

// router.post('/signup',createEmployer)
// router.post("/addemployer", createMongoEmployer);
router.post("/updateemployer", updateEmployer);
router.get("/home", employerHomePage);

module.exports = router;

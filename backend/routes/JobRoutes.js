const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobApplicants,
  jobApplications,
  eachJobApplications,
} = require("../controllers/JobController");

router.post("/post-job", createJob);
router.get("/jobs-posted/:employerID", getAllJobs);
router.get("/job-applicants/:id", getJobApplicants);
router.get("/jobapplications/aggregate/:id/:year", jobApplications);
router.get("/eachjobapplications/aggregate/:id/:year", eachJobApplications);
module.exports = router;

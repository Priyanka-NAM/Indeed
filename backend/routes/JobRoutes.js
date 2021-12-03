const express = require("express");
const router = express.Router();
const {
  createJob,
  updateJob,
  getAllJobs,
  getJobApplicants,
  jobApplications,
  eachJobApplications,
} = require("../controllers/JobController");

router.post("/post-job", createJob);
router.post("/update-job", updateJob);
router.get("/jobs-posted/:employerID", getAllJobs);
router.get("/job-applicants/:jobId&:employerId", getJobApplicants);
router.get("/jobapplications/aggregate/:id", jobApplications);
router.get("/eachjobapplications/aggregate/:id", eachJobApplications);
module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createJob,
  updateJob,
  getAllJobs,
  getJobApplicants
} = require("../controllers/JobController");

router.post("/post-job", createJob);
router.post("/update-job", updateJob);
router.get("/jobs-posted/:employerID", getAllJobs);
router.get("/job-applicants/:id", getJobApplicants);
module.exports = router;

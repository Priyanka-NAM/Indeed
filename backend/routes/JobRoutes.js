const express = require("express");
const router = express.Router();
const {createJob,updateJob} = require("../controllers/JobController");


router.post("/post-job", createJob);
router.post("/update-job", updateJob);

module.exports = router;

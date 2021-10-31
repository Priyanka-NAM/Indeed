const express = require("express");
const router = express.Router();
const postJob = require("../controllers/JobController");
const updateJob = require("../controllers/JobController");

router.post("/post-job", postJob);
router.post("/update-job", updateJob);

module.exports = router;

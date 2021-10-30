const express = require("express");
const router = express.Router();
const postJob = require("../controllers/JobController");

router.post("/post-job", postJob);
module.exports = router;

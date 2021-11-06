/* 
@ POST
/indeed/employer/post-job
Employer Post Job Route
 */
const Jobs = require("../Models/JobsModel");
const createJob = async (req, res) => {
  const {
    jobId,
    jobTitle,
    employerID,
    companyName,
    jobLocation,
    jobType,
    isRemote,
    salary,
    jobDescription,
  } = req.body; // get the data from request body which is in json and put it in variables called user and password
  console.log("requestis", req);
  const jobExists = await Jobs.findOne({ jobId });
  if (jobExists) {
    res.status("400").send("Error");
  } else {
    const job = await Jobs.create({
      jobId,
      jobTitle,
      employerID,
      companyName,
      jobLocation,
      jobType,
      isRemote,
      salary,
      jobDescription,
    });

    if (job) {
      console.log("Created!");
      res.status(201).json({
        jobId,
        jobTitle,
        employerID,
        companyName,
        jobLocation,
        jobType,
        isRemote,
        salary,
        jobDescription,
      });
    } else {
      res.status("400");
      throw new Error("400 Bad Request: Please try again later. ");
    }
  }
};

/* 
@ Update
/indeed/employer/update-job
Employer Update Job Route
 */
const updateJob = async (req, res) => {
  const {
    jobId,
    jobTitle,
    employerID,
    companyName,
    jobLocation,
    jobType,
    isRemote,
    salary,
    jobDescription,
  } = req.body; // get the data from request body which is in json and put it in variables called user and password
  console.log("requestis", req);
  const jobExists = await Jobs.findOne({ jobId });
  if (!jobExists) {
    res.status("400").send("Error");
  } else {
    const job = await Jobs.updateOne({
      jobId,
      jobTitle,
      employerID,
      companyName,
      jobLocation,
      jobType,
      isRemote,
      salary,
      jobDescription,
    });

    if (job) {
      console.log("Updated!");
      res.status(201).json({
        jobId,
        jobTitle,
        employerID,
        companyName,
        jobLocation,
        jobType,
        isRemote,
        salary,
        jobDescription,
      });
    } else {
      res.status("400");
      throw new Error("400 Bad Request: Please try again later. ");
    }
  }
};
module.exports = { createJob, updateJob };

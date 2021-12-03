/* 
@ POST
/indeed/employer/post-job
Employer Post Job Route
 */
const mongoose = require("mongoose");
const Jobs = require("../Models/JobsModel");
const Users = require("../Models/UserModel");
const Reviews = require("../Models/ReviewsModel");
const Applications = require("../Models/ApplicationModel");
const createJob = async (req, res) => {
  // get the data from request body which is in json and put it in variables called user and password
  // const jobExists = await Jobs.findOne({ jobId });
  console.log("req.body for jobs", req.body);

  // if (jobExists) {
  //   res.status("400").send("Error");
  // } else {
  const job = await Jobs.create({
    ...req.body,
  });

  if (job) {
    console.log("Created!");
    console.log(job);
    res.status(201).send(job);
  } else {
    res.status("400");
    throw new Error("400 Bad Request: Please try again later. ");
  }
  //}
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
    const job = await jobExists.updateOne({
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

/* 
@ Get
/indeed/employer/jobs-posted
Employer Get All Jobs
 */

const getAllJobs = async (req, res) => {
  const { employerID } = req.params;
  console.log("Req.params", employerID); // get the data from request body which is in json and put it in variables called user and password
  console.log("requestis", req);
  // const employerExists = await Jobs.findOne({ employerID: employerID });
  // if (!employerExists) {
  //   res.status("400").send("Employer Not found");
  // } else {
  const getJobs = await Jobs.find({ employerID: employerID });
  if (!getJobs) {
    res.status("200").send("Jobs Not found");
  }
  res.send(getJobs);
  //}
};

const getJobApplicants = async (req, res) => {

  try{
    const jobApplicants = await Applications.find({$and:[{jobId: req.params.jobId},{employerId: req.params.employerId}]});

    if(jobApplicants.length > 0){
      res.status(200).send(jobApplicants);
    }
    else{
      res.status(200).send("No Job Applicants for this job");
    }

  }
  catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const jobApplications = async (req, res) => {
  // const employerID = req.params.id;
  const employerID = mongoose.Types.ObjectId(req.params.id);
  console.log("Req.params", employerID); // get the data from request body which is in json and put it in variables called user and password
  const TotalApplications = await Applications.aggregate([
    {
      $match: { employerId: employerID },
    },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  // .match({ employerId: employerID })
  // .group({ _id: "$status", count: { $sum: 1 } });

  if (!TotalApplications) {
    res.status("400").send("Employer Applications Not found");
    return;
  } else {
    // const getJobs = await Jobs.find({ employerID });
    // if (!getJobs) {
    //   res.status("200").send("Jobs Not found");
    // }
    res.send(TotalApplications);
  }
};

const eachJobApplications = async (req, res) => {
  // const employerID = req.params.id;
  const employerID = mongoose.Types.ObjectId(req.params.id);
  console.log("Req.params", employerID); // get the data from request body which is in json and put it in variables called user and password
  const TotalApplications = await Applications.aggregate([
    {
      $match: { employerId: employerID },
    },
    {
      $group: {
        _id: { jobId: "$jobId", status: "$status" },
        count: { $sum: 1 },
      },
    },
  ]);
  // .match({ employerId: employerID })
  // .group({ _id: "$status", count: { $sum: 1 } });

  if (!TotalApplications) {
    res.status("400").send("Employer Applications Not found");
    return;
  } else {
    // Process the aggregate output
    const jobObj = { jobTitle: "", applied: 0, rejected: 0, selected: 0 };
    let processedResult = [];
    let jobIds = [];
    for (let i = 0; i < TotalApplications.length; i++) {
      if (!jobIds.find((ele) => ele === TotalApplications[i]._id.jobId)) {
        const jobinfo = await Jobs.findById(TotalApplications[i]._id.jobId);
        let jobObj = {
          jobId: TotalApplications[i]._id.jobId,
          jobTitle: jobinfo.jobTitle,
          applied: 0,
          rejected: 0,
          selected: 0,
        };
        jobIds.push(TotalApplications[i]._id.jobId);
        processedResult.push(jobObj);
      }
    }
    for (let i = 0; i < TotalApplications.length; i++) {
      for (let j = 0; j < processedResult.length; j++) {
        if (processedResult[j].jobId === TotalApplications[i]._id.jobId) {
          if (TotalApplications[i]._id.status === "applied") {
            processedResult[j].applied += TotalApplications[i].count;
          }
          if (TotalApplications[i]._id.status === "rejected") {
            processedResult[j].rejected += TotalApplications[i].count;
          }
          if (TotalApplications[i]._id.status === "selected") {
            processedResult[j].selected += TotalApplications[i].count;
          }
        }
      }
    }

    res.send(processedResult);
  }
};

module.exports = {
  createJob,
  updateJob,
  getAllJobs,
  getJobApplicants,
  jobApplications,
  eachJobApplications,
};

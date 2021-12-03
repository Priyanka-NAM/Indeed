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
  try {
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
  } catch (error) {
    res.status(500).send("Database error");
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
  try {
    // const job = await Jobs.create({
    //   ...req.body,
    // });

    const { employerID } = req.params;
    const getJobs = await Jobs.find({ employerID: employerID });
    if (!getJobs) {
      res.status("200").send("Jobs Not found");
    }
    res.send(getJobs);
  } catch (error) {
    res.status(500).send("Database error");
  }
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
  const employerID = mongoose.Types.ObjectId(req.params.id);
  const dateYear = req.params.year;
  let currDate, nextDate;
  if (dateYear == 1990) {
    currDate = new Date(1990, 0, 1);
    nextDate = new Date();
  } else {
    currDate = new Date(dateYear, 0, 1);
    nextDate = new Date(dateYear, 11, 31);
  }
  console.log("Req.params", employerID);
  try {
    const TotalApplications = await Applications.aggregate([
      {
        $match: {
          $and: [
            { employerId: employerID },
            {
              createdAt: {
                $gte: currDate,
                $lte: nextDate,
              },
            },
          ],
        },
      },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    if (!TotalApplications) {
      res.status("400").send("Employer Applications Not found");
      return;
    } else {
      res.send(TotalApplications);
    }
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const eachJobApplications = async (req, res) => {
  const employerID = mongoose.Types.ObjectId(req.params.id);
  const dateYear = req.params.year;
  let currDate, nextDate;
  if (dateYear === 1990) {
    currDate = new Date(1990, 0, 1);
    nextDate = new Date();
  } else {
    currDate = new Date(dateYear, 0, 1);
    nextDate = new Date(dateYear, 11, 31);
  }
  console.log("Aggregation Year ", currDate.toString());
  console.log("Req.params", employerID);
  try {
    const TotalApplications = await Applications.aggregate([
      {
        $match: {
          $and: [
            { employerId: employerID },
            {
              createdAt: {
                $gte: currDate,
                $lte: nextDate,
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: { jobId: "$jobId", status: "$status" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (!TotalApplications) {
      res.status("400").send("Employer Applications Not found");
      return;
    } else {
      // Process the aggregate output
      const jobObj = { jobTitle: "", applied: 0, rejected: 0, selected: 0 };
      let processedResult = [];
      let jobIds = [];
      for (let i = 0; i < TotalApplications.length; i++) {
        if (!jobIds.find((ele) => ele.equals(TotalApplications[i]._id.jobId))) {
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
          console.log("Inside Loop JobIds == > ", jobIds);
          console.log(
            "Inside Loop TotalApplications == > ",
            TotalApplications[i]._id.jobId
          );
        }
      }
      console.log("processedResult == > ", processedResult);
      console.log("JobIds == > ", jobIds);
      for (let i = 0; i < TotalApplications.length; i++) {
        for (let j = 0; j < processedResult.length; j++) {
          if (processedResult[j].jobId.equals(TotalApplications[i]._id.jobId)) {
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
  } catch (error) {
    console.log("Error in aggregation ", error);
    res.status(500).send("Database error");
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

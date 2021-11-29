/* 
@ POST
/indeed/employer/post-job
Employer Post Job Route
 */
const Jobs = require("../Models/JobsModel");
const Users = require("../Models/UserModel");
const Reviews = require("../Models/ReviewsModel");

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
  const employerExists = await Jobs.findOne({ employerID: employerID });
  if (!employerExists) {
    res.status("400").send("Employer Not found");
  } else {
    const getJobs = await Jobs.find({ employerID });
    if (!getJobs) {
      res.status("200").send("Jobs Not found");
    }
    res.send(getJobs);
  }
};

const getJobApplicants = async (req, res) => {
  try{
    const jobApplicants = await Jobs.findById({_id: req.params.id});

    if(jobApplicants){
      const applicants = []

      for(let i=0; i<jobApplicants.applicants.length; i++){
        applicants.push(await Users.findById({_id: jobApplicants.applicants[i]}));
      }

      res.status(200).send(applicants)
    }
    else{
      res.status(400).send("Error: Unable to get Job Applicants")
    }
  }
  catch(error){
    res.status(500).send("Internal Server Error")
  }
}

module.exports = { createJob, updateJob, getAllJobs, getJobApplicants };

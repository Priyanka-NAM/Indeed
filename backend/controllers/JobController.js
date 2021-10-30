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
  //res.send(req.body)
  if (jobExists) {
    res.status("400").send("Error");
    //throw new Error ("Employer Already exists")
  } else {
    //console.log("asas")
    //res.status("200").json(req.body)

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

module.exports = createJob;

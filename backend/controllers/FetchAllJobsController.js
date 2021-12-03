
// Method : GET
// Fetching all the  jobs posted by the employer

const Jobs = require("../Models/JobsModel")
const redisClient = require('../config/redisClient');
const { rPopCount } = require("../config/redisClient");
const { set } = require("mongoose");

const fetchJobs = async (req, res) => {
    console.log("req query : ",req.query)
    const job = req.query.job
    const location = req.query.location
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    if (job && location) {
        const query = {$or: [
            {
                $and: [
                    {"jobTitle": job},
                    {"jobLocation.city": location}
                ]
            },
            {
                $and: [
                    {"companyName": job},
                    {"jobLocation.city": location}
                ]
            }
        ]}
        paginationFunc(res, page, limit, query)
    } else if (job) {
        const query = {$or: [
            {
                "jobTitle": job
            },
            {
                "companyName": job
            }
        ]}
        paginationFunc(res, page, limit, query)
    } else if (location) {
        const query = {"jobLocation.city":location}
        paginationFunc(res, page, limit, query)
    } else {
        const query = {}
        paginationFunc(res, page, limit, query)
    }
}

const paginationFunc = async (res, page, limit, query) => {
    console.log("page & limit : ", page, limit)
    const startIndex = (page - 1) * limit 
    const endIndex = page * limit

    const results = {}
    if (page === 0 && limit === 0) { 
      try {
        results.results = await Jobs.find(query).populate('employerID')
        if (results.results) {
            res.status(200).send(results.results)   
        } else {
            res.status(404).send("Resource not found")
        } 
      } catch (error) {
        res.status(500).send("Database error")
      }
    } else {
      if (endIndex < await Jobs.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }

      try {
        results.results = await Jobs.find(query).limit(limit).skip(startIndex).populate('employerID').exec()
        if (results.results) {
            res.status(200).send(results.results)   
        } else {
            res.status(404).send("Resource not found")
        }
        
      } catch (e) {
        res.status(500).send("Database error")
      }
    }
}

const fetchMostSearchedJobs = async (req, res) => {
  // const location = req.query.location
  // console.log(location)
  try {
    const data = await redisClient.get('getMostSearchedJobs')
    if (data) {
      res.status(200).send(JSON.parse(data));
    }
    else{
      const jobs = await Jobs.find({});
      console.log(jobs)
      if(jobs){
        redisClient.setEx('getMostSearchedJobs', 36000, JSON.stringify(jobs));
        res.status(200).send(jobs);
      } else {
        return res.status(400).json({
          error: error
        });
      }
    }
} catch (error) {
  console.log(error)
  return res.status(500).json({
        error: error
        });
}
}

module.exports = { fetchJobs, fetchMostSearchedJobs}

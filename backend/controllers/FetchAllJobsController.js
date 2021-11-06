
// Method : GET
// Fetching all the  jobs posted by the employer

const Jobs = require("../Models/JobsModel")

const fetchJobs = async (req, res) => {
    try {
        const jobList = await Jobs.find()
        if (jobList) {
            res.status(200).send(jobList)
        } else {
            res.status(404).send("Resource not found")
        }
    } catch(err) {
        res.status(500).send("Database error")
    }
}

module.exports = fetchJobs

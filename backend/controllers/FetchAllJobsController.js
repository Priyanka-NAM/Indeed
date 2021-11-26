
// Method : GET
// Fetching all the  jobs posted by the employer

const Jobs = require("../Models/JobsModel")

const fetchJobs = async (req, res) => {
    console.log("req query : ",req.query)
    const job = req.query.job
    const location = req.query.location
    if (job && location) {
        try {       
            const jobList = await Jobs.find({$or: [
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
        ]})
        console.log("job list : ",jobList)
        if (jobList) {
            return res.status(200).send(jobList)
        } else {
            return res.status(404).send("Resource not found")
        }
        } catch (error) {
            return res.status(500).send("Database error")
        }
    } else if (job) {
        try {       
            const jobList = await Jobs.find({$or: [
            {
                "jobTitle": job
            },
            {
                "companyName": job
            }
        ]})
        console.log("job list : ",jobList)
        if (jobList) {
            return res.status(200).send(jobList)
        } else {
            return res.status(404).send("Resource not found")
        }
        } catch (error) {
            return res.status(500).send("Database error")
        }
    } else if (location) {
        try {
            const jobList = await Jobs.find({"jobLocation.city":location})
            if (jobList) {
                return res.status(200).send(jobList)
            } else {
                return res.status(404).send("Resource not found")
            }
        } catch(err) {
            return res.status(500).send("Database error")
        }
    } else {
        try {
            let results = [{}];
            const jobList = await Jobs.find()
            for(let job of jobList) {
                results
            }
            console.log("job list : ", jobList)
            if (jobList) {
                res.status(200).send(jobList)
            } else {
                res.status(404).send("Resource not found")
            }
        } catch(err) {
            res.status(500).send("Database error")
        }
    }
}

module.exports = fetchJobs

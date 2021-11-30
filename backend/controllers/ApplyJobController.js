const Application = require("../Models/ApplicationModel");

const postJob = async (req, res) => {
    const {userId, jobId, employerId} = req.body
    console.log(userId, jobId)
    try {
        if (userId) {
        //     const appResult = await Application.create({
        //         userId,
        //         jobId,
        //         employerId,
        //         status : "applied"
        //     });
        //     if (appResult) {
        //         return res.status(200).send("job applied successfully")
        //     } else {
        //         return res.status(404).send("Resource not found")
        //     }
            const applicationExists = await Application.findOne({$and: [
                {
                    "userId": userId
                },
                {
                    "employerId": employerId
                },
                {
                    "jobId": jobId
                }
            ]})
            console.log("app exists", applicationExists)
            if (applicationExists) {
                const appResult = await Application.findOneAndUpdate({userId}, {jobId, status:"applied"}, {new:true})
                if (appResult) {
                    return res.status(200).send("job applied successfully")
                } else {
                    return res.status(404).send("Resource not found")
                }
            } else {
                console.log("create else")
                const appResult = await Application.create({
                    userId,
                    jobId,
                    employerId,
                    status : "applied"
                });
                if (appResult) {
                    return res.status(200).send("job applied successfully")
                } else {
                    return res.status(404).send("Resource not found")
                }
            }
        } else {
            res.status(401).send("Unauthorized")
        }   
    } catch (error) {
        res.status(500).send("Database error")
    }
} 

module.exports = { postJob }
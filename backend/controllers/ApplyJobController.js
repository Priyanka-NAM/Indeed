const Application = require("../Models/ApplicationModel");
const User = require("../Models/UserModel");

const postJob = async (req, res) => {
    const {userId, jobId, employerId,email, resume} = req.body
    console.log(userId, jobId, resume, email)
    try {
        if (userId) {
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
                return res.status(409).send("job already applied")
                // const appResult = await Application.findOneAndUpdate({userId}, {jobId, status:"applied"}, {new:true})
                // if (appResult) {
                //     return res.status(200).send("job updated successfully")
                // } else {
                //     return res.status(404).send("Resource not found")
                // }
            } else {
                console.log("create else")
                const resumefile = null
                if (!resume) {
                    resumefile = "."
                }
                const appResult = await Application.create({
                    userId : userId,
                    jobId: jobId,
                    employerId: employerId,
                    status : "Applied",
                    resume: resume,
                    emailId: email
                });
                if (appResult) {
                    await User.findOneAndUpdate({_id: userId}, {$push: {"appliedJobs": jobId}}, {new:true})
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
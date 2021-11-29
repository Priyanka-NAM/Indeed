const User = require("../Models/UserModel");

const updateUserSavedJobs = async (req, res) => {
    const {userId, jobId} = req.body
    console.log(userId, jobId)
    if (userId) {
        const jobExists = await User.find({savedJobs : jobId})
        console.log("jobexists : ", jobExists)
        const user = await User.findOneAndUpdate({_id: userId}, {$push: {"savedJobs": jobId}}, {new:true})
        if (user) {
            res.status(200).send("added job to saved jobs")
        } else {
            res.status(500).send("database error")
        }
    }
} 

const deleteUserSavedJobs = async (req, res) => {
    const {userId, jobId} = req.body
    console.log(userId, jobId)
    if (userId) {
        const user = await User.findOneAndUpdate({_id: userId}, {$pull: {"savedJobs": jobId}}, {new:true})
        if (user) {
            res.status(200).send("removed from saved jobs")
        } else {
            res.status(500).send("database error")
        }
    }
}

module.exports = { updateUserSavedJobs, deleteUserSavedJobs }
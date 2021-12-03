const Reviews = require("../Models/ReviewsModel");
const User = require("../Models/UserModel");

const updateUserSavedJobs = async (req, res) => {
    const {userId, jobId} = req.body
    console.log(userId, jobId)
    try {
        if (userId) {
            const jobExists = await User.findOne({savedJobs : jobId})
            if (jobExists) {
                console.log("jobexists : ", jobExists)
                return res.status(409).send("Job already added to saved jobs")
            }
            const user = await User.findOneAndUpdate({_id: userId}, {$push: {"savedJobs": jobId}}, {new:true})
            if (user) {
                res.status(200).send("added job to saved jobs")
            } else {
                res.status(404).send("Resource not found")
            }
        } else {
            res.status(401).send("Unauthorized")
        }   
    } catch (error) {
        res.status(500).send("Database error")
    }
} 

const deleteUserSavedJobs = async (req, res) => {
    const {userId, jobId} = req.body
    console.log(userId, jobId)
    try {
        if (userId) {
            const user = await User.findOneAndUpdate({_id: userId}, {$pull: {"savedJobs": jobId}}, {new:true})
            if (user) {
                res.status(200).send("removed from saved jobs")
            } else {
                res.status(404).send("Resource not found")
            }
        } else {
            res.status(401).send("Unauthorized")
        }   
    } catch (error) {
        res.status(500).send("Database error")
    }
}

const getUserSavedJobs = async (req, res) => {
    const {userId} = req.query
    console.log(userId)
    try {
        if (userId) {
            const jobs = await User.findOne({_id: userId}, {savedJobs:1, _id:0}).populate('savedJobs')
            if (jobs) {
                res.status(200).send(jobs)
            } else {
                res.status(404).send("Resource not found")
            }
        } else {
            res.status(401).send("Unauthorized")
        }   
    } catch (error) {
        res.status(500).send("Database error")
    }
}

const getUserAppliedJobs = async (req, res) => {
    const {userId} = req.query
    console.log(userId)
    try {
        if (userId) {
            const jobs = await User.findOne({_id: userId}, {appliedJobs:1, _id:0}).populate('appliedJobs')
            if (jobs) {
                res.status(200).send(jobs)
            } else {
                res.status(404).send("Resource not found")
            }
        } else {
            res.status(401).send("Unauthorized")
        }   
    } catch (error) {
        res.status(500).send("Database error")
    }
}

const getUserReviews = async (req, res) => {
    const {userId} = req.query
    console.log(userId)
    try {
        if (userId) {
            const reviews = await Reviews.find({userId})
            if (reviews) {
                res.status(200).send(reviews)
            } else {
                res.status(404).send("Resource not found")
            }
        } else {
            res.status(401).send("Unauthorized")
        }   
    } catch (error) {
        res.status(500).send("Database error")
    }
}

const getUserProfile = async (req, res) => {

    const {userId} = req.query;

    try {
        if (userId) {
            const user = await User.findById({_id:userId})
            if (user) {
                console.log(user);
                res.status(200).send(user)
            } else {
                console.log("user");
                res.status(404).send("Resource not found")
            }
        } else {
            res.status(401).send("Unauthorized")
        }   
    } catch (error) {
        res.status(500).send("Database error")
    }
}

const updateUserProfile = async (req, res) => {
    const {userId} = req.body
    const update = req.body
    console.log(userId)
    try {
        if (userId) {
            const user = await User.findOneAndUpdate({_id:userId}, update, {new: true})
            if (user) {
                res.status(200).send(user)
            } else {
                res.status(404).send("Resource not found")
            }
        } else {
            res.status(401).send("Unauthorized")
        }   
    } catch (error) {
        res.status(500).send("Database error")
    }
}

module.exports = { updateUserSavedJobs, deleteUserSavedJobs, getUserSavedJobs, getUserAppliedJobs, getUserReviews, getUserProfile, updateUserProfile }
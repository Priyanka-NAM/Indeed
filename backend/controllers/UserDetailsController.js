const User = require("../Models/UserModel");

const updateUserSavedJobs = (req, res) => {
    console.log(req.body)
    return res.status(200)
}

module.exports = { updateUserSavedJobs }
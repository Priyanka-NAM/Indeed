const mongoose = require('mongoose')
 
const applicationSchema = mongoose.Schema({
        userId: {
            type: String,
            // ref: 'User',
            required:true
        },
        employerId: {
            type: String,
            // ref: 'Employer',
            required:true
        },
        jobId: {
            type: String,
            // ref: 'Jobs',
            required:true
        },
        status: {
            type: String,
        },
    },{timestamps:true})

const Application = mongoose.model('Application', applicationSchema) 
module.exports = Application

const mongoose = require('mongoose')
 
const userSchema = mongoose.Schema({
        email:{
            type:String,
            required:true,
            unique:true
        },
        userId: {
            type: Number,
            required: true
        },
        location: {
            type: String,
        },
        resume: {
            type: String,
        },
        savedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Jobs'   
            }
        ],
        appliedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Jobs'
            }
        ]
    },{timestamps:true})

const User = mongoose.model('User',userSchema) 
module.exports = User

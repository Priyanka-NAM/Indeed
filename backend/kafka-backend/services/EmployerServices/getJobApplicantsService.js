const Applications = require('../../../Models/ApplicationModel')

const handle_request = async(msg, callback) => {

    try{
        const jobApplicants = await Applications.find({$and:[{jobId: msg.jobId},{employerId: msg.employerId}]});
        console.log("J0b Applicants: ", jobApplicants)
        if(jobApplicants.length > 0){

            callback(null, jobApplicants);
        }
        else{

            callback(null, "No Job Applicants for this job")
        }

    }
    catch (error) {
        const err = {
            "error" : error
        }
        callback(err, null)
    }

}

exports.handle_request = handle_request;
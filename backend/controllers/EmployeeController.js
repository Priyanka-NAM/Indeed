
/* 
@ POST
/indedd/employer/addemployer
User Signup Route
 */
const Employer = require('../Models/EmployerModel')
const createEmployer = async (req,res)=>{
    const {employerID,employerName,website,companyType,aboutTheCompany} = req.body // get the data from request body which is in json and put it in variables called user and password
    const employerExists = await Employer.findOne({employerID})
    //res.send(req.body)
    if(employerExists)
     {
         res.status("400").send("Error")
         //throw new Error ("Employer Already exists")
     }
     else
     {
         //console.log("asas")
         //res.status("200").json(req.body)
         
        const employer =  await Employer.create({
            employerID,
            employerName,
            website,
            companyType,
            aboutTheCompany
        })
 
        if(employer){
            //console.log("Created!")
         res.status(201).json(
             {
             employerID,
             employerName,
             website,
             companyType,
             aboutTheCompany
            

             }
         )
     }
     else{
         res.status("400")
         throw new Error ("400 Bad Request: Please try again later. ")
     }
     }
 
     
    
 }

 module.exports = createEmployer
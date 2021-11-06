
/* 
@ POST
/indedd/employer/addemployer
User Signup Route
 */

const {pool} = require('../config/mysqldb')
const Employer = require('../Models/EmployerModel')
const bcrypt = require('bcryptjs')
const createEmployer = async (req,res,insertId)=>{
    const { email, password, role } = req.body;
<<<<<<< HEAD:backend/controllers/EmployerController.js
    pool.getConnection( async(err, conn) => {
=======
    pool.getConnection(async (err, conn) => {
>>>>>>> 1c1b7a2f9007c42b16f19c56b90773249425153c:backend/controllers/EmployeeController.js
      if (err) {
        res.send('Error occured');
      } else {
          const salt = await bcrypt.genSalt(10);
      const Hashedpassword = await bcrypt.hash(password, salt);
        conn.query(
          'INSERT INTO users (email, password, role) VALUES (?,?,?)',
          [email, Hashedpassword, role],
          (error, insertResult) => {
            if (error) {
              return res.status(400).json({
                "msg" : error
              });
            }
            
            createMongoEmployer(req,res,insertResult.insertId)
            
            conn.release();
          },
        );
      }
    })
     
    
 }

 const createMongoEmployer = async(req,res,insertId) =>{

    
    const {employerID,employerName,website,companyType,aboutTheCompany} = req.body 
    const employerExists = await Employer.findOne({employerID})
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
            employerID:insertId,
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


 const updateEmployer = async(req,res,insertId) =>{

    
  const {employerID,employerName,website,companyType,aboutTheCompany} = req.body 
  const employerExists = await Employer.findOne({employerID})
  if(!employerExists)
   {
       res.status("400").send("Error. Employer doesn't Exist.")
       //throw new Error ("Employer Already exists")
   }
   else
   {
       //console.log("asas")
       //res.status("200").json(req.body)
       
      const employer =  await Employer.updateOne({
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

 module.exports = {createEmployer,updateEmployer}
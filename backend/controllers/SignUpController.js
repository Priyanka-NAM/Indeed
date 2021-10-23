
/* 
@ POST
/api/users/signup
User Signup Route
 */
const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs')
const createUser = async (req,res)=>{
    
    const {firstName,lastName,email,password} = req.body // get the data from request body which is in json and put it in variables called user and password
    const userExists = await User.findOne({email})
    if(userExists)
     {
         res.status("400")
         throw new Error ("User Already exists")
     }
     else
     {
         const salt = await bcrypt.genSalt(10) 
        const Hashedpassword = await bcrypt.hash(password,salt)
        const user =  await User.create({
            firstName,
            lastName,
            email,
            password:Hashedpassword, 
        })
 
        if(user){
            console.log("Created!")
         res.status(201).json(
             {
             _id:user._id,
            firstName:user.firstName,
            

             }
         )
     }
     else{
         res.status("400")
         throw new Error ("400 Bad Request: Please try again later. ")
     }
     }
 
     
    
 }

 module.exports = createUser
const mongoose =  require('mongoose')
const env = require('dotenv')
const connectDB = async () =>{
    try { 
        // mongoose connect always returns a promise// hence await is required
        const con = await mongoose.connect('mongodb+srv://team7:mypassword@indeeddb.awj0c.mongodb.net/indeed_db?authSource=admin&replicaSet=atlas-rzo35r-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
            {useUnifiedTopology:true,useNewUrlParser:true}
            )
       console.log(`Connected to DB ${con.connection.host}`) 
    } catch (error) {
        console.log(`Connection Failed! ${error}`) 
        process.exit(1)
    }
}

module.exports = connectDB;
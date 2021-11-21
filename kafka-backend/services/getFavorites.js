const Reviews = require('../Models/ReviewsModel');
const { errorHandler } = require('../Utils/dbErrorHandler');

async function handle_request (id, callback){
   
  console.log("Inside Get all Reviews restaurant kafka backend");
     
  Reviews.find({})
    .exec((err, data) => {
      if (err) {
        callback(null, errorHandler(err));
      }
      callback(null, data); 
    });
};

exports.handle_request = handle_request;
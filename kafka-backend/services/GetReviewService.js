const Reviews = require("../Models/ReviewsModel");
const redisClient = require('../config/redisClient');

async function handle_request(msg, callback) {
  try {
    redisClient.get('getReview', async (err, data) => {
      //     // If value for key is available in Redis
          if (data) {
              // send data as output
              console.log("Inside cache");
              return callback(err,JSON.parse(data));
          } 
          const review = await Reviews.find({});
          if (!review) {
            return callback(err, { error: error });
          }
          redisClient.setex('getReview', 36000, JSON.stringify(review));
          callback(null, review);
        }) 
    }catch (error) {
      return callback(error, { error: error });
    }
   
}

exports.handle_request = handle_request;

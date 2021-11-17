const Reviews = require("../Models/ReviewsModel");

function handle_request(msg, callback) {
  try {
    const review = Reviews.find({});
    msg.review = review;
    if (!review) {
      return callback(error, { error: error });
    }
    callback(null, review);
  } catch (error) {
    return callback(error, { error: error });
  }
}

exports.handle_request = handle_request;

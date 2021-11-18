const Reviews = require("../Models/ReviewsModel");

async function handle_request(msg, callback) {
  try {
    const review = await Reviews.find({});
    if (!review) {
      return callback(error, { error: error });
    }
    callback(null, review);
  } catch (error) {
    return callback(error, { error: error });
  }
}

exports.handle_request = handle_request;

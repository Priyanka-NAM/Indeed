const Reviews = require("../Models/ReviewsModel");
var kafka = require("../kafka/client");
const redisClient = require('../config/redisClient');

exports.postUserReview = async (req, res) => {
  const {
    overallRating,
    reviewSummary,
    yourReview,
    pros,
    cons,
    isApproved,
    isFeatured,
    interviewPreparation,
    user,
  } = req.body;
  const usersReview = await Reviews.create({
    overallRating,
    reviewSummary,
    yourReview,
    pros,
    cons,
    isApproved,
    isFeatured,
    interviewPreparation,
    user,
  });
  res.status(200).send(usersReview);
};
exports.findReviewById = async (req, res, next, id) => {
  try {
    const review = await Reviews.findById(id);
    req.review = review;
    if (!review) {
      return res.status(400).json({
        error: error,
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const review = await Reviews.find({ user: req.body.id }).populate("user");
    req.review = review;
    if (!review) {
      return res.status(400).json({
        error: error,
      });
    }
    res.send(review);
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

exports.getEmployerReviews = async (req, res) => {
  try {
    const review = await Reviews.find({ employer: req.body.id }).populate(
      "employer"
    );
    req.review = review;
    if (!review) {
      return res.status(400).json({
        error: error,
      });
    }
    res.send(review);
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

exports.getAllReviews = async (req, res) => {
  console.log("getreviews");
  // try {
  //     redisClient.get('getReview', async (err, data) => {
  //     // If value for key is available in Redis
  //     if (data) {
  //         // send data as output
  //         res.send(JSON.parse(data));
  //     } 
  //     // If value for given key is not available in Redis
  //     else {
  //       let resp_time = Date.now()
  //       console.log(`Before mongo query, time is ${resp_time}`)
  //         // Fetch data from your database
  //         kafka.make_request("get-reviews", req.body, function (err, results) {
  //           if (err) {
  //             console.log("Inside err");
  //             res.json({
  //               status: "error",
  //               msg: "Could not fetch groups, Try Again.",
  //             });
  //           } else {
  //             res.status(200).json(results);
  //             redisClient.setex('getReview', 36000, JSON.stringify(results));
  //           }
  //         });
  //     // const review = await Reviews.find({});
  //     // if(!review){
  //     //     return res.status(400).json({
  //     //         error: error
  //     //     });
  //     // } else {
  //     //   res.status(200).send(review)
  //     //   console.log(`time taken = ${(Date.now() - resp_time)/1000}`)
  //     //   // store that in Redis
  //     //   // params: key, time-to-live, value
  //     //   redisClient.setex('getReview', 36000, JSON.stringify(review));
  //     //   // send data as output
  //     // }
  //     }
  // })
  // } catch (error) {
  // // Handle error
 
  // }

  kafka.make_request("get-reviews", req.body, function (err, results) {
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "Could not fetch groups, Try Again.",
      });
    } else {
      res.status(200).json(results);
    }
  });
    




 
};

exports.UpdateReviewStatus = async (req, res) => {
  console.log(req.review);
  try {
    const review = await Reviews.findOneAndUpdate(
      { _id: req.review._id },
      { isApproved: req.body.isApproved }
    );
    if (!review) {
      return res.status(400).json({
        error: error,
      });
    }
    res.send(review);
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

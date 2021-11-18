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
  console.log("in get reviews")
//   try {
//     redisClient.get('getAllReviews', async (err, data) => {
//         // If value for key is available in Redis
//         if (data) {
//             // send data as output
//             res.send(JSON.parse(data));
//         } 
//         // If value for given key is not available in Redis
//         else {
//             // Fetch data from your database
//         const review = await Reviews.find({});
//         req.review = review;
//         if(!review){
//             return res.status(400).json({
//                 error: error
//             });
//         }
//           // store that in Redis
//             // params: key, time-to-live, value
//             redisClient.setex('getAllReviews', 36000, JSON.stringify(review));

//             // send data as output
//             res.send(JSON.parse(review));
//         }
//     })
// } catch (error) {
//     // Handle error
//             return res.status(400).json({
//               error: error
//             });
// }



    try{
        const review = await Reviews.find({});
        req.review = review;
        if(!review){
            return res.status(400).json({
                error: error
            });
        }
        res.send(review);
      }
        catch(error){
            return res.status(400).json({
              error: error
            });
        }



  // kafka.make_request("get-reviews", req.body, function (err, results) {
  //   if (err) {
  //     console.log("Inside err");
  //     res.json({
  //       status: "error",
  //       msg: "Could not fetch groups, Try Again.",
  //     });
  //   } else {
  //     res.status(200).json(results);
  //   }
  // });
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

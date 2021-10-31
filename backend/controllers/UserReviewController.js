const Reviews = require('../Models/ReviewsModel')

exports.postUserReview = async (req, res) => {
    const {overallRating, reviewSummary, yourReview, pros, cons, isApproved, isFeatured, interviewPreparation, user} = req.body
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
    })
    res.status(200).send(usersReview)
}
exports.findReviewById = async(req, res, next, id) => {
    try{
    const review = await Reviews.findById(id);
    req.review = review;
    if(!review){
        return res.status(400).json({
            error: error
        });
    }
    next();
  }
    catch(error){
        return res.status(400).json({
          error: error
        });
    }
  };

exports.getUserReviews = async (req, res) => {
    try{
        const review = await Reviews.find({user: req.body.id}).populate('user');
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
}

exports.getEmployerReviews = async (req, res) => {
    try{
        const review = await Reviews.find({employer: req.body.id}).populate('employer');
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
}

exports.getAllReviews = async (req, res) => {
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
}

exports.UpdateReviewStatus = async (req, res) => {
    console.log(req.review);
    try{
        const review = await Reviews.findOneAndUpdate({ _id: req.review._id }, { isApproved: req.body.isApproved })
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
}
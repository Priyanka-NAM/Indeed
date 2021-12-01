const Employer = require("../Models/EmployerModel");
exports.uploadPhoto = async (req, res) => {
  const { userId, employerId, urls } = req.body;

  let emp = await Employer.findById(employerId);

  for (const url of urls) {
    emp.photos.push({
      path: url,
      userId,
    });
  }

  await emp.save((err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(emp);
    }
  });
};

exports.updatePhotoStatus = async (req, res) => {
try{
  let emp = await Employer.findOneAndUpdate({_id : req.query.employerId , 
    "photos._id": req.query.photoId } , {$set: {'photos.$.status': true}});
   if(emp){
    res.status(200).send(emp);
   }
   
}
catch (error) {
  return res.status(400).json({
    error: error,
  });
}
 
}

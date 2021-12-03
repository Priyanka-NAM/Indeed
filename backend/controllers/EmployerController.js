/* 
import Review from './../../frontend/src/components/Company/Company';
@ POST
/indeed/employer/addemployer
User Signup Route
 */

const { pool } = require("../config/mysqldb");
const Employer = require("../Models/EmployerModel");
const Review = require("../Models/ReviewsModel");
const bcrypt = require("bcryptjs");

const updateEmployer = async (req, res) => {
  console.log("req", req);
  const employerExists = await Employer.findOne({
    employerID: req.body.employerID,
  });
  if (!employerExists) {
    res.status("400").send("Error. Employer doesn't Exist.");
  } else {
    const employer = await employerExists.updateOne({
      ...req.body,
    });

    if (employer) {
      res.status(201).json({
        ...req.body,
      });
    } else {
      res.status("400");
      throw new Error("400 Bad Request: Please try again later. ");
    }
  }
};

const getEmployerDetails = async (req, res) => {
  const { employerID } = req.params;

  console.log("employerID ", employerID);
  const employerExists = await Employer.findOne({ _id: employerID });
  if (!employerExists) {
    res.status("400").send("Employer Not found");
    return;
  }
  res.send(employerExists);
};

const companyPicsUpload = async (req, res) => {
  const { employerID, urls, fieldName } = req.body;
  let emp = await Employer.findOne({ _id: employerID });
  if (!emp) {
    res.status("400").send("Error. Employer doesn't Exist.");
  } else {
    if (fieldName === "companyBanner") emp.companyBanner = urls[0];
    else if (fieldName === "companyLogo") emp.companyLogo = urls[0];
    else if (fieldName === "companyCeoPicture") emp.companyCeoPicture = urls[0];

    await emp.save((err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(emp);
      }
    });
  }
};

const employerReviewUpdate = async (req, res) => {
  const { _id } = req.body;

  let review = await Review.findOne({ _id: _id });

  if (!review) {
    res.status("400").send("Error. Review doesn't Exist.");
  } else {
    review.isFeatured = !review.isFeatured;
    await review.save((err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(review);
      }
    });
  }
};

module.exports = {
  updateEmployer,
  getEmployerDetails,
  companyPicsUpload,
  employerReviewUpdate,
};

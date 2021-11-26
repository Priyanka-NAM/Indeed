/* 
@ POST
/indeed/employer/addemployer
User Signup Route
 */

const { pool } = require("../config/mysqldb");
const Employer = require("../Models/EmployerModel");
const bcrypt = require("bcryptjs");

const updateEmployer = async (req, res) => {
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

module.exports = { updateEmployer };

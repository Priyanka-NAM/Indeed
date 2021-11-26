/* 
@ POST
/indeed/employer/addemployer
User Signup Route
 */

const { pool } = require("../config/mysqldb");
const Employer = require("../Models/EmployerModel");
const bcrypt = require("bcryptjs");

const createMongoEmployer = async (req, res, id) => {
  const employerExists = await Employer.findOne({
    employerID: id, 
  });
  if (employerExists) {
    console.log("Employer exists");
    res.status("400").send("Error");
  } else {
    console.log("asas");

    const employer = await Employer.create({
      employerID: id,
    });

    if (employer) {
      console.log("Created!");
      res.status(201).json({
        employerID: id,
      });
    } else {
      res.status("400");
      throw new Error("400 Bad Request: Please try again later. ");
    }
  }
};

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

module.exports = { createMongoEmployer, updateEmployer };

const Salaries = require("../Models/SalaryModel");

const userSalary = async (req, res) => {
  const { jobTitle, currentPay, companyName, isWorking, endDate, jobLocation } =
    req.body;
  const usersSalary = await Salaries.create({
    jobTitle,
    currentPay,
    companyName,
    isWorking,
    endDate,
    jobLocation,
  });
  const data = {
    _id: usersSalary._id,
    currentPay: usersSalary.currentPay,
    companyName: usersSalary.companyName,
  };
  res.status(200).send(data);
};
const getUserSalary = async (req, res) => {
  console.log("get all reviews");
  try {
    const salary = await Salaries.find({});
    if (!salary) {
      console.log("error");
      return res.status(400).json({
        error: error,
      });
    }
    res.send(salary);
  } catch (error) {
    console.log("error");
    return res.status(400).json({
      error: error,
    });
  }
};

module.exports = { userSalary, getUserSalary };

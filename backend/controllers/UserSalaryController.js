const Salaries = require('../Models/SalaryModel')

const userSalary = async (req, res) => {
    const {jobTitle, currentPay} = req.body
    const usersSalary = await Salaries.create({
        jobTitle,
        currentPay
    })
    const data = {
        _id : usersSalary._id,
        currentPay: usersSalary.currentPay
    }
    res.status(200).send(data)
}

module.exports = userSalary

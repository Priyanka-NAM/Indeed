const express = require("express");
const app = express();

const userRouter = require("./routes/UserRoutes");
const companyRouter = require("./routes/CompanyRoutes");
const employerRoutes = require("./routes/EmployeeRoutes");
const jobRoutes = require("./routes/JobRoutes");

const connectDB = require("./config/db");
require("./config/mysqldb");
app.use(express.json());

app.use("/indeed/users", userRouter);
app.use("/indeed/company", companyRouter);
app.use("/indeed/employer", employerRoutes);
app.use("/indeed/employer", jobRoutes);

connectDB();
app.get("/", (req, res) => {
  res.send("API Started..");
});
console.log("my first command");
app.listen(5000, console.log("API Started.."));

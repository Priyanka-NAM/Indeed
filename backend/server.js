const express = require("express");
const app = express();

const userRouter = require("./routes/UserRoutes");
const companyRouter = require("./routes/CompanyRoutes");
const employerRoutes = require("./routes/EmployerRoutes");
const jobRoutes = require("./routes/JobRoutes");
const cors = require('cors');

const connectDB = require("./config/db");
require("./config/mysqldb");
app.use(cors());
app.use(express.json());
app.use((req,res,next) => {
  console.log(`${req.method} request for ${req.url}`)
  next()
})

app.use("/indeed/users", userRouter);
app.use("/indeed/company", companyRouter);
app.use("/indeed/employer", employerRoutes);
app.use("/indeed/employer", jobRoutes);

connectDB();
app.get("/", (req, res) => {
  res.send("API Started..");
});
console.log("my first command");
app.listen(5001, console.log("API Started.."));

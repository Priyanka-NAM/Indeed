const express = require("express");
const app = express();

<<<<<<< HEAD
const userRouter = require('./routes/UserRoutes')
const companyRouter = require('./routes/CompanyRoutes')
const employerRoutes = require('./routes/EmployerRoutes')
const jobRoutes=require('./routes/JobRoutes')
=======
const userRouter = require("./routes/UserRoutes");
const companyRouter = require("./routes/CompanyRoutes");
const employerRoutes = require("./routes/EmployerRoutes");
const jobRoutes = require("./routes/JobRoutes");
>>>>>>> 07ac928e8d1b684330b1b248f85bd058f655b803

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

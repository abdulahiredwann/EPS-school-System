require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const subject = require("./router/Subject");
const teacher = require("./router/Teacher");
const grade = require("./router/Grade");
const student = require("./router/Student");
const registerTeacher = require("./router/Register_Teacher");
const registerStudent = require("./router/Register_Student");
const loginTeacher = require("./router/Login_Teacher");
const loginStudent = require("./router/Login_Student");
const adminLogin = require("./router/Login_Admin");
const admin = require("./router/Admin");
const ini = require("./router/init");
const result = require("./router/Results");
const validation = require("./router/Validation");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// sudo systemctl start mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/EPS")
  .then(() => {
    console.log("Connected to db ....");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDb....", err);
  });

app.use("/api/subject", subject);
app.use("/api/teacher", teacher);
app.use("/api/grade", grade);
app.use("/api/student", student);
app.use("/api/registerteacher", registerTeacher);
app.use("/api/registerstudent", registerStudent);
app.use("/api/loginteacher", loginTeacher);
app.use("/api/loginstudent", loginStudent);
app.use("/api/verify", validation);
app.use("/api/result", result);
app.use("/api/init", ini);
app.use("/api/admin", admin);
app.use("/api/adminlogin", adminLogin);

app.listen(3000, () => {
  console.log("Server is listening ");
});

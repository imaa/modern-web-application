const express = require("express");
const {
  getStudents,
  getStudent,
} = require("../controllers/student.controller");
const studentRouter = express.Router();
studentRouter.route("/students").get(getStudents);
studentRouter.route("/students/:sid").get(getStudent);
module.exports = studentRouter;

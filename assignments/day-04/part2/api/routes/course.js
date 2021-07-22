const express = require("express");
const {
  getStudentCourse,
  getStudentCourses,
} = require("../controllers/course.controller");
const courseRouter = express.Router();
courseRouter.route("/students/:sid/courses").get(getStudentCourses);
courseRouter.route("/students/:sid/courses/:cid").get(getStudentCourse);
module.exports = courseRouter;

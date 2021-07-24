const express = require("express");
const {
  getCourses,
  addCourse,
  updateFullCourse,
  updatePartialCourse,
  deleteCourse,
  getCourse,
} = require("../controllers/course.controller");
const courseRouter = express.Router();
courseRouter.route("/students/:sid/courses").get(getCourses).post(addCourse);
courseRouter
  .route("/students/:sid/courses/:cid")
  .get(getCourse)
  .put(updateFullCourse)
  .patch(updatePartialCourse)
  .delete(deleteCourse);
module.exports = courseRouter;

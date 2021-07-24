const express = require("express");
const {
  getStudents,
  getStudent,
  addStudent,
  updateFullStudent,
  updatePartialStudent,
  deleteStudent,
} = require("../controllers/student.controller");
const studentRouter = express.Router();
studentRouter.route("/students").get(getStudents).post(addStudent);
studentRouter
  .route("/students/:sid")
  .get(getStudent)
  .put(updateFullStudent)
  .patch(updatePartialStudent)
  .delete(deleteStudent);
module.exports = studentRouter;

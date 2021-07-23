const mongoose = require("mongoose");
const validateObjectIds = require("../utilities/objectIdValidator");
const studentModel = mongoose.model("Student");
const getStudentCourses = (req, res) => {
  if (req.query.limit > 100) {
    res.status(400).json({ error: "limit is up to 100 document max" });
    return;
  }
  if (!req.params.sid) {
    res.status(400).json({
      error: "Student Id should be provided api/students/:sid/courses",
    });
    return;
  }
  if (!validateObjectIds(req.params.sid)) {
    res.status(400).json({
      error: "Invalid student id api/students/:sid/courses",
    });
    return;
  }
  studentModel
    .findById(req.params.sid)
    .select("courses")
    .exec((err, students) => {
      if (err) {
        res.status(500).json({ error: "Error occured" });
        return;
      }
      res.status(200).json(students);
    });
};
const getStudentCourse = (req, res) => {
  if (!req.params.sid) {
    res.status(400).json({ error: "Id should be provided api/students/:id" });
    return;
  }

  if (!req.params.cid) {
    res.status(400).json({
      error: "Course Id should be provided api/students/:sid/courses/:cid",
    });
    return;
  }
  if (!validateObjectIds([req.params.sid, req.params.cid])) {
    res.status(400).json({
      error: "Invalid student id or course id api/students/:sid/courses/:cid",
    });
    return;
  }
  studentModel
    .findById(req.params.sid)
    .select("courses")
    .exec((err, student) => {
      if (err) {
        res.status(500).json({ error: "Error occured" });
        return;
      }
      res.status(200).json(student.courses.id(req.params.cid));
    });
};

module.exports = {
  getStudentCourses: getStudentCourses,
  getStudentCourse: getStudentCourse,
};

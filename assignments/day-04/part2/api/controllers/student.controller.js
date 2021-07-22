const mongoose = require("mongoose");
const studentModel = mongoose.model("Student");
const getAllStudents = (req, res) => {
  if (req.query.limit > 100) {
    res.status(400).json({ error: "limit is up to 100 document max" });
    return;
  }
  studentModel
    .find()
    .skip(parseInt(req.query.skip ?? 0))
    .limit(parseInt(req.query.limit ?? 5))
    .exec((err, students) => {
      if (err) {
        res.status(500).json({ error: "Error occured" });
        return;
      }
      res.status(200).json(students);
    });
};
const getSingleStudent = (req, res) => {
  if (!req.params.sid) {
    res.status(400).json({ error: "Id should be provided api/students/:id" });
    return;
  }
  studentModel.findById(req.params.sid).exec((err, student) => {
    if (err) {
      res.status(500).json({ error: "Error occured" });
      return;
    }
    res.status(200).json(student);
  });
};

module.exports = {
  getStudents: getAllStudents,
  getStudent: getSingleStudent,
};

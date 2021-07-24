const mongoose = require("mongoose");
const { getInt } = require("../../helpers/number.helpers");

const Student = mongoose.model("Student");
getStudents = (req, res) => {
  Student.find()
    // what ever the user send will fall back to zero if not correct input
    .skip(req.query.skip >= 0 ? getInt(req.query.skip) : 0)
    // what ever the user send will fall back to five if not correct input
    // and if its more than 50 it will also fall back to 5
    .limit(
      req.query.limit > 0 && req.query.limit <= 50 ? getInt(req.query.limit) : 5
    )
    .exec((err, students) => {
      const response = { status: 200, message: students };
      if (err) {
        response.status = 500;
        response.message = {
          error: "Error occurred while getting the documents ",
          errors: err,
        };
      }
      res.status(response.status).json(response.message);
    });
};
const studentSelection = "-courses";
const findStudentById = (id, select, callBack) => {
  Student.findById(id)
    .select(select ?? studentSelection)
    .exec((err, student) => {
      const response = { status: 200, message: student };
      if (err) {
        response.status = 500;
        response.message = {
          error: "Error occurred while getting the documents ",
          errors: err,
        };
      } else if (!student) {
        response.status = 404;
        response.message = `Student with the id ${id} not found`;
      }
      callBack(response);
    });
};
getStudent = (req, res) => {
  findStudentById(req.params.sid, null, (response) => {
    res.status(response.status).json(response.message);
  });
};
addStudent = (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    birthDate: req.body.birthDate,
  });
  Student.create(newStudent, (err, student) => {
    const response = { status: 201, message: student };
    if (err) {
      response.status = 500;
      response.message = {
        error: "Error occurred while saving the document ",
        errors: err,
      };
    }
    res.status(response.status).json(response.message);
  });
};
deleteStudent = (req, res) => {
  Student.findByIdAndDelete(req.params.sid).exec((err, deletedStudent) => {
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = {
        error: "Error occurred while getting the documents ",
        errors: err,
      };
    } else if (!deletedStudent) {
      response.status = 404;
      response.message = `Student with the id ${req.params.sid} not found`;
    }
    res.status(response.status).json(response.message);
  });
};
updateFullStudent = (req, res) => {
  _updateStudent(true, req, res);
};
updatePartialStudent = (req, res) => {
  _updateStudent(false, req, res);
};
_updateStudent = (isFullUpdate = false, req, res) => {
  findStudentById(req.params.sid, null, (response) => {
    if (response.status === 200) {
      const student = response.message;
      if (req.body.name || isFullUpdate) {
        student.name = req.body.name;
      }
      if (req.body.birthDate || isFullUpdate) {
        student.birthDate = req.body.birthDate;
      }
      student.save((err) => {
        if (err) {
          response.status = 500;
          response.message = {
            error: "Error occurred while saving the document ",
            errors: err,
          };
        }
        res.status(response.status).json(student);
      });
    } else {
      res.status(response.status).json(response.message);
    }
  });
};

module.exports = {
  addStudent: addStudent,
  getStudent: getStudent,
  getStudents: getStudents,
  updateFullStudent: updateFullStudent,
  updatePartialStudent: updatePartialStudent,
  deleteStudent: deleteStudent,
  findStudentById: findStudentById,
};

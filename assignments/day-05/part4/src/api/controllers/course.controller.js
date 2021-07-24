const { request } = require("express");
const { findStudentById } = require("./student.controller");

const addCourse = (req, res) => {
  findStudentById(req.params.sid, "courses", (response) => {
    if (response.status == 200) {
      const student = response.message;
      const course = {
        name: req.body.name,
        grade: req.body.grade,
      };
      student.courses.push(course);
      student.save((err, doc) => {
        if (err) {
          response.status = 500;
          response.message = {
            error: "Error occurred while saving the course ",
            errors: err,
          };
        } else {
          response.message = doc;
        }
        res.status(response.status).json(response.message);
      });
    } else {
      res.status(response.status).json(response.message);
    }
  });
};
const getCourse = (req, res) => {
  findStudentById(req.params.sid, "courses", (response) => {
    if (response.status == 200) {
      const course = response.message.courses.id(req.params.cid);
      if (!course) {
        response.status = 404;
        response.message = `Course with the id ${req.params.cid} not found`;
      } else {
        response.message = course;
      }
    }
    console.log(response.message);
    res.status(response.status).json(response.message);
  });
};
const getCourses = (req, res) => {
  findStudentById(req.params.sid, "courses", (response) => {
    res.status(response.status).json(response.message.courses);
  });
};
const _updateCourse = (isFullUpdate = false, req, res) => {
  findStudentById(req.params.sid, "courses", (response) => {
    if (response.status === 200) {
      const student = response.message;
      const course = student.courses.id(req.params.cid);
      if (!course) {
        response.status = 404;
        response.message = `Course with the id ${req.params.cid} not found`;
        res.status(response.status).json(response.message);
      } else {
        if (req.body.name || isFullUpdate) {
          course.name = req.body.name;
        }
        if (req.body.grade || isFullUpdate) {
          course.grade = req.body.grade;
        }
        student.save((err) => {
          if (err) {
            response.status = 500;
            response.message = {
              error: "Error occurred while saving the document ",
              errors: err,
            };
          }
          res.status(response.status).json(course);
        });
      }
    } else {
      res.status(response.status).json(response.message);
    }
  });
};
const updateFullCourse = (req, res) => {
  _updateCourse(true, req, res);
};
const updatePartialCourse = (req, res) => {
  _updateCourse(false, req, res);
};
const deleteCourse = (req, res) => {
  findStudentById(req.params.sid, "courses", (response) => {
    if (response.status == 200) {
      const student = response.message;
      const course = student.courses.id(req.params.cid);
      console.log(course);
      if (!course) {
        response.status = 404;
        response.message = `Course with the id ${req.params.cid} not found`;
        res.status(response.status).json(response.message);
      } else {
        student.courses.pull(course);
        student.save((err, doc) => {
          if (err) {
            response.status = 500;
            response.message = {
              error: "Error occurred while removing the course ",
              errors: err,
            };
          } else {
            response.message = course;
          }
          res.status(response.status).json(response.message);
        });
      }
    } else {
      res.status(response.status).json(response.message);
    }
  });
};

module.exports = {
  addCourse: addCourse,
  getCourse: getCourse,
  getCourses: getCourses,
  updateFullCourse: updateFullCourse,
  updatePartialCourse: updatePartialCourse,
  deleteCourse: deleteCourse,
};

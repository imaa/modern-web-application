const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  grade: String,
});
const studentSchema = new mongoose.Schema({
  name: String,
  birthDate: Date,
  courses: [courseSchema],
});

mongoose.model("Student", studentSchema, "students");

const mongoose = require("mongoose");
const { models } = require("../../configs/models.config");

const ideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  developer: String,
});
const plSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  releaseDate: Date,
  founder: String,
  ides: {
    type: [ideSchema],
    default: [],
    required: false,
    select: false,
  },
});

mongoose.model(
  models.ProgramingLanguage.name,
  plSchema,
  models.ProgramingLanguage.collection
);

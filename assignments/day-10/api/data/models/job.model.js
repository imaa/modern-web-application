const mongoose = require("mongoose");
const configs = require("../../configs");
const locationSchema = mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: Number,
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});
const skillSchema = mongoose.Schema({
  title: String,
  level: {
    type: Number,
    min: 1,
    max: 10,
  },
});
const reviewSchema = mongoose.Schema({
  date: { type: Date, default: () => Date.now() },
  review: String,
  nameOfReviewer: String,
});
const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  location: {
    type: locationSchema,
    required: false,
  },
  description: String,
  experience: String,
  skills: {
    type: [skillSchema],
    required: false,
  },
  postDate: { type: Date, default: () => Date.now() },
  reviews: {
    type: [reviewSchema],
    select: false,
    require: false,
  },
});

mongoose.model(configs.dbConfig.models.job.name, jobSchema, configs.dbConfig.models.job.collectionName);

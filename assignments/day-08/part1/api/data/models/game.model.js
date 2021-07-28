const mongoose = require("mongoose");
const publisherSchema = new mongoose.Schema({
  name: String,
  country: String,
});
const reviewSchema = new mongoose.Schema({
  name: String,
  review: String,
  date: Date,
});
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  rate: { type: Number, min: 1, max: 5 },
  price: Number,
  minPlayers: { type: Number, min: 1, max: 10 },
  maxPlayers: { type: Number, min: 1, max: 10 },
  minAge: Number,
  designers: [String],
  publisher: publisherSchema,
  reviews: [reviewSchema],
});

mongoose.model("Game", gameSchema, "games");

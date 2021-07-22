const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: String,
  location: {
    type: String,
    coordinates: [Number],
  },
});
const gameSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rate: { type: Number, min: 1, max: 5 },
  price: Number,
  minPlayers: { type: Number, min: 1, max: 10 },
  maxPlayers: { type: Number, min: 1, max: 10 },
  publisher: publisherSchema,
  reviews: [String],
  minAge: Number,
  designers: [String],
});

mongoose.model("Game", gameSchema, "games");

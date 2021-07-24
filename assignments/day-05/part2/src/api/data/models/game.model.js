const mongoose = require("mongoose");
const publisherSchema = new mongoose.Schema({
  name: String,
  country: String,
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
});

mongoose.model("Game", gameSchema, "games");

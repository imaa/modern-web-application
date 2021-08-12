const mongoose = require("mongoose");
const { models } = require("../../configs/models.config");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

mongoose.model(models.account.name, userSchema, models.account.collection);

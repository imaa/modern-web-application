const mongoose = require("mongoose");
const configs = require("../../configs");
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

mongoose.model(configs.dbConfig.models.user.name, userSchema, configs.dbConfig.models.user.collectionName);

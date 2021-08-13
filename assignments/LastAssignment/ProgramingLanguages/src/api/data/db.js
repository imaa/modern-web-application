const mongoose = require("mongoose");
require("./models/programingLanguage.model");
require("./models/user.model");
const _db_url = process.env.DB_URL + process.env.DB_NAME;
mongoose.connect(_db_url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
  if (err) {
    console.log("error connecting to db");
  }
});
mongoose.connection.on("connected", () => {
  require("./seeds");
  console.log(`Successfully connected to mongo at ${_db_url}`);
});
mongoose.connection.on("disconnected", () => {
  console.log(`Successfully disconnected to mongo at ${_db_url}`);
});
mongoose.connection.on("error", (err) => {
  if (err) {
    console.log("error connecting to db", err);
  }
});
process.on("SIGINT", () => {
  mongoose.connection.close((err) => {
    process.exit(0);
  });
});
process.on("SIGUSR2", () => {
  mongoose.connection.close((err) => {
    process.exit(process.pid, "SIGINT");
  });
});

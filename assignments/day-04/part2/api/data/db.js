const mongoose = require("mongoose");
require("./models");

mongoose.connect(process.env.DB_URL + process.env.DB_NAME, (err) => {
  console.log("Db Connection Success...");
});
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("DB Disconnected");
});
mongoose.connection.on("err", (err) => {
  console.log("Error :", err);
});
process.on("SIGINT", () => {
  mongoose.connection.close(() => {});
  process.exit(0);
});

process.on("SIGUSR2", () => {
  mongoose.connection.close(() => {});
  process.kill(process.pid, "SIGINT");
});

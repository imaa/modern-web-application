const mongoose = require("mongoose");
require("./models/game.model");
mongoose.connect(process.env.DB_CONNECTION_URI + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});
mongoose.connection.on("error", (error) => {
  console.log("error", error);
});
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Close SIGINT");
    process.exit(0);
  });
});
process.on("SIGUSR2", () => {
  console.log("Close SIGUSR2");
  process.kill(process.pid, "SIGINT");
});

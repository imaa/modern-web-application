const mongoose = require("mongoose");
require("./models");
const _db_url = process.env.DB_URL + process.env.DB_NAME;
mongoose.connect(
  process.env.DB_URL + process.env.DB_NAME,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(`${process.env.PART_NAME} : error connecting to ${_db_url}`);
    }
  }
);
mongoose.connection.on("connected", () => {
  console.log(`${process.env.PART_NAME} : Db connection Success...${_db_url}`);
});
mongoose.connection.on("disconnected", () => {
  console.log(
    `${process.env.PART_NAME} : Db disconnected Success...${_db_url}`
  );
});
mongoose.connection.on("err", (err) => {
  console.log(`${process.env.PART_NAME} : Db disconnected error...${_db_url}`);
});
process.on("SIGINT", () => {
  mongoose.connection.close(() => {});
  process.exit(0);
});

process.on("SIGUSR2", () => {
  mongoose.connection.close(() => {});
  process.kill(process.pid, "SIGINT");
});

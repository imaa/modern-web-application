const mongoose = require("mongoose");
require("./models");
const _db_url = process.env.DB_URL + process.env.DB_NAME;
mongoose
  .connect(_db_url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => {
    console.log(`Db connection Success...${result.connection._connectionString}`);
  })
  .catch((err) => {
    if (err) {
      console.log(`Error connecting to ${_db_url}`);
    }
  });
mongoose.connection.on("connected", () => {
  console.log(`Db connection Success from listener...${_db_url}`);
});
mongoose.connection.on("disconnected", () => {
  console.log(`Db disconnected Success...${_db_url}`);
});
mongoose.connection.on("error", (err) => {
  console.log(`Db disconnected error...${_db_url}`);
});
process.on("SIGINT", () => {
  mongoose.connection.close(() => {});
  process.exit(0);
});

process.on("SIGUSR2", () => {
  mongoose.connection.close(() => {});
  process.kill(process.pid, "SIGINT");
});

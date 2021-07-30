const mongoose = require("mongoose");
require("./models");

mongoose.connect(
  process.env.DB_URL,
  { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(`Error while connecting to the database `, err);
    }
  }
);
mongoose.connection.on("connected", () => {
  require("./seed");
  console.log(`connection to database was successful :${process.env.DB_URL}`);
});
mongoose.connection.on("disconnected", () => {
  console.warn(`disconnected from database :${process.env.DB_URL}`);
});
mongoose.connection.on("error", (error) => {
  console.error(`Error occurred on db ${error}`);
});
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
process.on("SIGUSR2", () => {
  mongoose.connection.close(() => {
    process.kill(process.pid, "SIGUSR2");
  });
});

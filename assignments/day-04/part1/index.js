require("dotenv").config();
require("./api/data/db");
const express = require("express");
const router = require("./api/routes/games");

const app = express();
app.use("/api", router);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${server.address().port}/`);
});

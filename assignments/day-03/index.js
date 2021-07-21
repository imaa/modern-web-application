const express = require("express");
require("dotenv").config();
require("./api/data/db-connection").open();
const router = require("./api/routes/games");
const app = express();
app.use("/api", router);
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Http server is running on http://localhost:${server.address().port}/`
  );
});

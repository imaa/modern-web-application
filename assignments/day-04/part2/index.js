require("dotenv").config();
require("./api/data/db");
const express = require("express");
const courseRouter = require("./api/routes/course");
const studentRouter = require("./api/routes/student");

const app = express();
app.use("/api", studentRouter);
app.use("/api", courseRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${server.address().port}/`);
});

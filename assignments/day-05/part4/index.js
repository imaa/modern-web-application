require("dotenv").config({ path: "./part4/.env" });
if (!process.env.DB_URL) {
  // this if each part of the assignment run separately
  require("dotenv").config();
}
require("./src/api/data/db");
const express = require("express");
const studentRouter = require("./src/api/routes/student");
const courseRouter = require("./src/api/routes/course");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log("Call ", req.url);
  next();
});
app.use("/api", studentRouter);
app.use("/api", courseRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `${process.env.PART_NAME}: Server is running on http://localhost:${
      server.address().port
    }/`
  );
});

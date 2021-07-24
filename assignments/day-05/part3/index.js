require("dotenv").config({ path: "./part3/.env" });
if (!process.env.DB_URL) {
  // this if each part of the assignment run separately
  require("dotenv").config();
}
require("./src/api/data/db");
const express = require("express");
const gameRouter = require("./src/api/routes/game.router");
const publisherRouter = require("./src/api/routes/publisher.router");
const reviewRouter = require("./src/api/routes/review.router");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log("Call ", req.url);
  next();
});
app.use("/api", gameRouter);
app.use("/api", publisherRouter);
app.use("/api", reviewRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `${process.env.PART_NAME}: Server is running on http://localhost:${
      server.address().port
    }/`
  );
});

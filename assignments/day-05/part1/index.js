require("dotenv").config({ path: "./part1/.env" });
if (!process.env.DB_URL) {
  // this if each part of the assignment run separately
  require("dotenv").config();
}
require("./src/api/data/db");
const express = require("express");
const gameRouter = require("./src/api/routes/game.router");
const app = express();
app.use(express.json());
app.use("/api", gameRouter);
const server = app.listen(process.env.PORT, () => {
  console.log(
    `${process.env.PART_NAME}: Server is running on http://localhost:${
      server.address().port
    }/`
  );
});

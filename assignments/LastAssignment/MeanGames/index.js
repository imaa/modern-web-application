const express = require("express");
const path = require("path");
require("dotenv").config();
const configs = require("./api/configs/api-config");
require("./api/data/db");
const gameRouter = require("./api/routes/game.router");
const accountRouter = require("./api/routes/account.router");
var cors = require("cors");
const app = express();
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(process.env.PUBLIC_FOLDER));
app.use(express.json());
app.use(configs.apiPrefix, gameRouter);
app.use(configs.apiPrefix, accountRouter);
const server = app.listen(process.env.PORT, () => {
  const httpServerUrl = `http://${process.env.SERVER_NAME}:${server.address().port}`;
  console.log(
    `MEAN Games Home page is running on ${httpServerUrl}/\n\rAPI to access all games on ${httpServerUrl}${
      configs.apiPrefix
    }${configs.games.path()}`
  );
});

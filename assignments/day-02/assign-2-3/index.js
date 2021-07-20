const express = require("express");
const configs = require("./api/configs/api-config");
const router = require("./api/routes");
require("dotenv").config();
const app = express();
app.use(express.static(process.env.PUBLIC_FOLDER));
app.use(configs.prefex, router);
const server = app.listen(process.env.PORT, () => {
  const httpServerUrl = `http://${process.env.SERVER_NAME}:${
    server.address().port
  }`;
  console.log(
    `MENA Games Home page is running on ${httpServerUrl}/\n\rAPI to access all games on ${httpServerUrl}${configs.prefex}${configs.games.base}`
  );
});

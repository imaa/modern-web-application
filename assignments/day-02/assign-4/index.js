const express = require("express");
const configs = require("./api/config/api-configs");
const router = require("./api/routes");
require("dotenv").config();
const app = express();

app.use(configs.prefex, router);

const server = app.listen(process.env.PORT, () => {
  const httpServerUrl = `http://${process.env.SERVER_NAME}:${
    server.address().port
  }`;
  console.log(
    `Calculater is running on ${httpServerUrl}/\n\rto add two number call ${httpServerUrl}${
      configs.prefex
    }${configs.calculater.base}/${Math.floor(
      Math.random() * 100
    )}?num2=${Math.floor(Math.random() * 100)}`
  );
});

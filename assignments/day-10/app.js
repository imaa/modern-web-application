require("dotenv").config();
require("./api/data/db");
const express = require("express");
const configs = require("./api/configs");
const router = require("./api/routes");
const path = require("path");
const app = express();
app.use(express.static(process.env.PUBLIC_FOLDER));
app.use(configs.apiConfig.assets, express.static(path.join(__dirname, process.env.NODE_MODULES)));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(configs.apiConfig.apiPrefix, router);
const server = app.listen(process.env.PORT, () => {
  console.log(`Http server is running on http://localhost:${server.address().port}/`);
});

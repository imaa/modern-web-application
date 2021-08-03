require("dotenv").config();
require("./api/data/db")
const express = require("express");
const path = require("path");
const configs = require("./api/configs/config");
const weatherRouter = require("./api/routes/wather.router");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(process.env.PUBLIC_FOLDER))
app.use("/" + process.env.NODE_MODULES, express.static(path.join(__dirname, process.env.NODE_MODULES)))
app.use(configs.api.prefix, weatherRouter)
const server = app.listen(process.env.PORT, () => {
    console.log(`Http server is running on http://localhost:${server.address().port}/`)
})

const a = new Promise();
a.
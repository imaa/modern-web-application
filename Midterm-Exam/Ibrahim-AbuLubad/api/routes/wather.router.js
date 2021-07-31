const express = require("express");
const configs = require("../configs/config");
const { getAll, saveOne, getSingle, fullUpdate, partialUpdate, deleteOne } = require("../controllers/wather.controller");

const weatherRouter = express.Router();
weatherRouter.route(configs.api.weather.path()).get(getAll).post(saveOne);
weatherRouter.route(configs.api.weather.fullPath()).get(getSingle).put(fullUpdate).patch(partialUpdate).delete(deleteOne);
module.exports = weatherRouter;
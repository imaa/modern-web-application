const express = require("express");
const configs = require("../configs/api-config");
const { getGames, getGame } = require("../controllers/game.controller");

const gameRouter = express.Router();
gameRouter.route(configs.games.path()).get(getGames);
gameRouter.route(configs.games.full()).get(getGame);
module.exports = gameRouter;

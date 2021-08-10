const express = require("express");
const configs = require("../configs/api-config");
const { authenticate } = require("../controllers/account.controller");
const {
  getGames,
  getGame,
  deleteGame,
  updateFullGame,
  updatePartialGame,
  addGame,
} = require("../controllers/game.controller");

const gameRouter = express.Router();
gameRouter.route(configs.games.path()).get(getGames).post(authenticate, addGame);
gameRouter.route(configs.games.full()).get(getGame).delete(deleteGame).put(updateFullGame).patch(updatePartialGame);
module.exports = gameRouter;

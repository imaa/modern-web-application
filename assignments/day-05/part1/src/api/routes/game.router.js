const express = require("express");
const {
  getGames,
  addGame,
  updateFullGame,
  updatePartialGame,
  deleteGame,
  getGame,
} = require("../controllers/game.controller");

const gameRouter = express.Router();
gameRouter.route("/games").get(getGames).post(addGame);
gameRouter
  .route("/games/:id")
  .get(getGame)
  .put(updateFullGame)
  .patch(updatePartialGame)
  .delete(deleteGame);
module.exports = gameRouter;

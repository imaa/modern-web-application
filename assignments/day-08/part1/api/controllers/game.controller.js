const mongoose = require("mongoose");
const { getInt } = require("../../helpers/number.helpers");
const configs = require("../configs/api-config");

const Game = mongoose.model("Game");
getGames = (req, res) => {
  Game.find()
    .skip(req.query.skip >= 0 ? getInt(req.query.skip) : 0)
    .limit(
      req.query.limit > 0 && req.query.limit <= configs.games.maxListCount()
        ? getInt(req.query.limit)
        : configs.games.defaultListCount()
    )
    .exec((err, games) => {
      const response = { status: 200, message: games };
      if (err) {
        response.status = 500;
        response.message = {
          error: "Error occurred while getting the documents ",
          errors: err,
        };
      }
      res.status(response.status).json(response.message);
    });
};
getGame = (req, res) => {
  Game.findById(req.params[configs.games.id()]).exec((err, game) => {
    const response = { status: 200, message: game };
    if (err) {
      response.status = 500;
      response.message = {
        error: "Error occurred while getting the documents ",
        errors: err,
      };
    } else if (!game) {
      response.status = 404;
      response.message = `Game with the id ${id} not found`;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getGame: getGame,
  getGames: getGames,
};

const mongoose = require("mongoose");
const { getInt, getFloat } = require("../../helpers/number.helpers");

const Game = mongoose.model("Game");
getGames = (req, res) => {
  Game.find()
    // what ever the user send will fall back to zero if not correct input
    .skip(req.query.skip >= 0 ? getInt(req.query.skip) : 0)
    // what ever the user send will fall back to five if not correct input
    // and if its more than 50 it will also fall back to 5
    .limit(
      req.query.limit > 0 && req.query.limit <= 50 ? getInt(req.query.limit) : 5
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
const gameSelection = "-reviews -publisher";
const findGameById = (id, select, callBack) => {
  Game.findById(id)
    .select(select ?? gameSelection)
    .exec((err, game) => {
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
      callBack(response);
    });
};
getGame = (req, res) => {
  findGameById(req.params.id, null, (response) => {
    res.status(response.status).json(response.message);
  });
};
addGame = (req, res) => {
  const newGame = new Game({
    title: req.body.title,
    year: getInt(req.body.year),
    rate: getInt(req.body.rate),
    price: getFloat(req.body.price),
    minPlayers: getInt(req.body.minPlayers),
    maxPlayers: getInt(req.body.maxPlayers),
    minAge: getInt(req.body.minAge),
    designers: [req.body.designer],
  });
  Game.create(newGame, (err, game) => {
    const response = { status: 201, message: game };
    if (err) {
      response.status = 500;
      response.message = {
        error: "Error occurred while saving the document ",
        errors: err,
      };
    }
    res.status(response.status).json(response.message);
  });
};
deleteGame = (req, res) => {
  Game.findByIdAndDelete(req.params.id).exec((err, deletedGame) => {
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = {
        error: "Error occurred while getting the documents ",
        errors: err,
      };
    } else if (!deletedGame) {
      response.status = 404;
      response.message = `Game with the id ${req.params.id} not found`;
    }
    res.status(response.status).json(response.message);
  });
};
updateFullGame = (req, res) => {
  _updateGame(true, req, res);
};
updatePartialGame = (req, res) => {
  _updateGame(false, req, res);
};
_updateGame = (isFullUpdate = false, req, res) => {
  findGameById(req.params.id, null, (response) => {
    if (response.status === 200) {
      const game = response.message;
      if (req.body.title || isFullUpdate) {
        game.title = req.body.title;
      }
      if (req.body.year || isFullUpdate) {
        game.title = getInt(req.body.year);
      }
      if (req.body.rate || isFullUpdate) {
        game.rate = getInt(req.body.rate);
      }
      if (req.body.price || isFullUpdate) {
        game.price = getFloat(req.body.price);
      }
      if (req.body.minPlayers || isFullUpdate) {
        game.minPlayers = getInt(req.body.minPlayers);
      }
      if (req.body.maxPlayers || isFullUpdate) {
        game.maxPlayers = getInt(req.body.maxPlayers);
      }
      if (req.body.minAge || isFullUpdate) {
        game.minAge = getInt(req.body.minAge);
      }
      if (req.body.designers || isFullUpdate) {
        game.designers = [req.body.designer];
      }
      game.save((err) => {
        if (err) {
          response.status = 500;
          response.message = {
            error: "Error occurred while saving the document ",
            errors: err,
          };
        }
        res.status(response.status).json(game);
      });
    } else {
      res.status(response.status).json(response.message);
    }
  });
};

module.exports = {
  addGame: addGame,
  getGame: getGame,
  getGames: getGames,
  updateFullGame: updateFullGame,
  updatePartialGame: updatePartialGame,
  deleteGame: deleteGame,
  findGameById: findGameById,
};

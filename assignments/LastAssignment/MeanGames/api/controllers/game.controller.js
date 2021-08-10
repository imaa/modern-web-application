const e = require("express");
const mongoose = require("mongoose");
const { HTTP_STATUS } = require("../../helpers/httpStatus");
const { getInt, getFloat } = require("../../helpers/numbers");
const { serverErrorResponse, meanGamesResponse, completeRequest } = require("../../helpers/response");
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
    .exec()
    .then((games) => {
      let response = meanGamesResponse(HTTP_STATUS.OK, games);
      completeRequest(res, response);
    })
    .catch((err) => {
      console.log(err);
      completeRequest(res, serverErrorResponse());
    });
};
getGame = (req, res) => {
  Game.findById(req.params[configs.games.id()])
    .exec()
    .then((game) => {
      let response = meanGamesResponse(HTTP_STATUS.OK, game);
      if (!game) {
        response.status = 404;
        response.data = `Game with the id ${id} not found`;
      }
      completeRequest(res, response);
    })
    .catch((err) => {
      console.log(err);
      completeRequest(res, serverErrorResponse());
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
  Game.create(newGame)
    .then((game) => {
      completeRequest(res, meanGamesResponse(HTTP_STATUS.CREATED, game));
    })
    .catch((err) => {
      console.log(err);
      completeRequest(res, serverErrorResponse());
    });
};
deleteGame = (req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .exec()
    .then((deletedGame) => {
      let response = meanGamesResponse(HTTP_STATUS.NO_CONTENT, null);
      if (!deletedGame) {
        response.status = 404;
        response.data = `Game with the id ${req.params.id} not found`;
      }
      completeRequest(res, response);
    })
    .catch((err) => {
      console.log(err);
      completeRequest(res, serverErrorResponse());
    });
};
updateFullGame = (req, res) => {
  _updateGame(true, req, res);
};
updatePartialGame = (req, res) => {
  _updateGame(false, req, res);
};
_updateGame = (isFullUpdate = false, req, res) => {
  findGameById(req.params.id, null)
    .then(findGameByIdSuccess.bind(null, isFullUpdate, req, res))
    .catch(() => {
      completeRequest(res, response);
    });
};
const findGameByIdSuccess = (isFullUpdate, req, res, response) => {
  const game = response.data;
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
  game
    .save()
    .then(() => {
      response.data = game;
      completeRequest(res, response);
    })
    .catch(() => {
      console.log(err);
      completeRequest(res, serverErrorResponse());
    });
};
const gameSelection = "-reviews -publisher";
const findGameById = (id, select) => {
  return new Promise((resolve, reject) => {
    Game.findById(id)
      .select(select ?? gameSelection)
      .exec()
      .then((game) => {
        let response = meanGamesResponse(HTTP_STATUS.OK, game);
        if (!game) {
          response.status = 404;
          response.data = `Game with the id ${id} not found`;
        }
        resolve(response);
      })
      .catch((err) => {
        reject(serverErrorResponse());
      });
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

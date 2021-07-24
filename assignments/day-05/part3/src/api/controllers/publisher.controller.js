const mongoose = require("mongoose");
const { findGameById } = require("./game.controller");

const Game = mongoose.model("Game");

const getPublisher = (req, res) => {
  findGameById(req.params.id, "publisher", (response) => {
    res.status(response.status).json(response.message);
  });
};

_updateGamePublisher = (isFullUpdate = false, req, res) => {
  findGameById(req.params.id, "publisher", (response) => {
    if (response.status === 200) {
      const game = response.message;
      if (req.body.name || isFullUpdate) {
        game.publisher.name = req.body.name;
      }
      if (req.body.country || isFullUpdate) {
        game.publisher.country = req.body.country;
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
const updateFullPublisher = (req, res) => {
  _updateGamePublisher(true, req, res);
};
const updatePartialPublisher = (req, res) => {
  _updateGamePublisher(false, req, res);
};
module.exports = {
  getPublisher: getPublisher,
  updateFullPublisher: updateFullPublisher,
  updatePartialPublisher: updatePartialPublisher,
};

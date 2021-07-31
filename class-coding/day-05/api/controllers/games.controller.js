const mongoose = require("mongoose");
const gameModel = mongoose.model("Game");
const getAll = (req, res) => {
  //geo location search ()
  {
  }
  ////
  gameModel
    .find()
    .skip(req.query.skip >= 0 ? parseInt(req.query.skip) : 0)
    .limit(req.query.limit > 0 ? parseInt(req.query.limit) : 5)
    .exec((err, games) => {
      if (err) {
        res.status(500).json({ err: err });
      } else {
        console.log("found games", games.length);
        res.status(200).json(games);
      }
    });
};
const getSingleGame = (req, res) => {
  gameModel.findById(req.params.gameId).exec((err, game) => {
    if (err) {
      res.status(500).json({ err: err });
    } else if (!game) {
      res.status(404).json({ error: "The game with the given id not found" });
    } else {
      console.log("found game", game);
      res.status(200).json(game);
    }
  });
};
const runGeoQuery = (req, res) => {
  //db.games.createIndex({"publisher.location":"2dsphere"})
  //api hardening
  Game.updateOne(
    { _id: req.params.gameId },
    {
      $set: {
        publisher: [
          {
            name: "The Publisher Name",
            location: {
              type: "Point",
              coordinates: [req.body.lag, req.body.lat],
            },
          },
        ],
      },
    }
  );
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  console.log(`Geo search long ${lat} Lat ${lng}`);
  const query = {
    "publisher.location": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: 1000,
        $minDistance: 0,
      },
    },
  };
  gameModel.find(query).exec((err, result) => {
    res.status(200).json(result);
  });
};
module.exports = { getAll: getAll, getSingedGame: getSingleGame };

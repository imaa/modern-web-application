const mongoose = require("mongoose");
const gameModel = mongoose.model("Game");
const getAll = (req, res) => {
  if (req.query.limit > 100) {
    res.status(400).json({ error: "limit is up to 100 document max" });
    return;
  }
  gameModel
    .find()
    .skip(parseInt(req.query.skip ?? 0))
    .limit(parseInt(req.query.limit ?? 5))
    .exec((err, result) => {
      if (err) {
        res.status(500).json({ error: "Error occured" });
        return;
      }
      res.status(200).json(result);
    });
};
const getSingle = (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "Id should be provided api/games/:id" });
    return;
  }
  gameModel.findById(req.params.id).exec((err, game) => {
    if (err) {
      res.status(500).json({ error: "Error occured" });
      return;
    }
    res.status(200).json(game);
  });
};

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
};

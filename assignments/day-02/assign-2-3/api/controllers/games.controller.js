const gamesData = require("../data/games.json");
const getAllGames = (req, res) => {
  res.status(200).json(gamesData);
};
module.exports.games = {
  getAll: getAllGames,
};

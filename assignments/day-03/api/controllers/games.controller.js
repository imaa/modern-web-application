const { get } = require("../data/db-connection");

const gamesGetAll = (req, res) => {
  if (req.query.limit > 7) {
    res.status(400).json({ error: "Maximam data fetch is 7 documents only" });
    return;
  }
  const gamesCollection = get().collection(process.env.GAMES_COLLECTION_NAME);
  gamesCollection
    .find()
    .skip(parseInt(req.query.skip ?? 0))
    .limit(parseInt(req.query.limit ?? 5))
    .toArray((err, result) => {
      if (err) {
        res.status(500).json({ error: "Error occured on the server" });
        return;
      }
      res.status(200).json(result);
    });
};
module.exports = {
  games: {
    getAll: gamesGetAll,
  },
};

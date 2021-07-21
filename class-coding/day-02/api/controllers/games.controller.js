const gamesData = require("../data/games.json")

module.exports = {
    gamesGetAll: (req, res) => {
        const count = parseInt(req.query?.count ?? 5);
        const offset = parseInt(req.query?.offset ?? 0);
        res.status(200).json(gamesData.slice(offset, count + offset));
    },
    getSingle: (req, res) => {
        const id = req.params.id;
        res.status(200).json(gamesData[id]);
    },
    addGame: (req, res) => {
        const body = req.body;
        res.status(200).json(body);
    },

}
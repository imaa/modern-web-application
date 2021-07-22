const mongoose = require("mongoose");
const gameModel = mongoose.model("Game");
const getAll = (req, res) => {
    //geo location search ()
    {

    }
    ////
    gameModel.find().skip(parseInt(req.query.skip ?? 0)).limit(parseInt(req.query.limit ?? 5)).exec((err, games) => {
        console.log("found games", games.length)
        res.status(200).json(games);
    })
}
const runGeoQuery = (req, res) => {

    //db.games.createIndex({"publisher.location":"2dsphere"})
    //api hardining
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    console.log(`Geo sarch long ${lat} Lat ${lng}`);
    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: 1000,
                $minDistance: 0
            }
        }
    };
    gameModel.find(query).exec((err, result) => {
        res.status(200).json(result);
    })
}
module.exports = getAll;
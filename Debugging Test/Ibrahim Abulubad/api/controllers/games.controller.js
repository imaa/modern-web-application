var mongoose = require("mongoose");
var Game = mongoose.model("Game");

module.exports.gameGetAll = function (req, res) {

    var offset = 0;
    var count = 5;
    var maxCount = 15;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.cont) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "Query string offset and count should be numbers." });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
        return;
    }

    Game.find().skip(offset).limit(cout).exec(function (err, games) {
        if (err) {
            console.log("Error finding games");
            res.status(500).json(err);
        } else {
            console.log("Found games", games.length);
            res.json(games);
        }
    })
};

module.exports.gameGetOne = function (req, res) {
    var gameId = req.params.gamesId;
    Game.findById(gameId).exec(function () {
        var response= {
            status: 200,
            message: game
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if(!game) {
            response.status= 404;
            response.message= {"message" : "Game ID not found"};
        }
        console.log("Found Game", game);
        res.status(response.status).json(response.message);
    });
};

var _splitNames= function(input) {
    var output;
    if (input && input.length >0) {
        output= input.split(",");
    } else {
        output= [];
    }
    return output;
}

module.exports.gameAddOne = function (req, res) {
    var publisher = {
        name: "empty",
        location: []
    }
    Game.create({
        title: req.body.title,
        year: parseInt(req.body.year, 10),
        price: parseFloat(req.body.price),
        designers: _splitNames(req.body.designers),
        minPlayers: parseInt(req.body.minPlayers, 10),
        maxPlayers: parseInt(req.body.maxPlayers, 10),
        rate: parseFloat(req.body.rate),
        minAge: parseInt(req.body.minAge),
        publisher: publisher
    }, function(err, game){
        var response= {
            status: 201,
            message: game
        };
        if (err) {
            console.log(err);
            console.log("Error creating game");
            response.status= 400;
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
};

// Not used in UI
module.exports.gameUpdateOne = function (req, res) {
    var gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("-publisher -reviews").exec(function (err, game) {
        var response= {
            status: 204
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if(!game) {
            response.status= 404;
            response.message= {"message" : "Game ID not found"};
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            game.title= req.body.title;
            game.year= parseInt(req.body.year, 10);
            game.price= parseFloat(req.body.price);
            game.designers= _splitNames(req.body.designers);
            game.minPlayers= parseInt(req.body.minPlayers, 10);
            game.maxPlayers= parseInt(req.body.maxPlayers, 10);
            game.rate= parseFloat(req.body.rate);
            game.minAge= parseInt(req.body.minAge);
            game.save(function(err, updatedGame) {
                if (err) {
                    response.status= 500;
                    response.message= err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};

// Not used in UI
module.exports.gameDeleteOne = function (req, res) {
    var gameId = req.params.gameId;
    console.log("DELETE gameId ", gameId);
    Game.findByIdAndRemove(gameId).exec(function (err, deletedGame) {
        var response= {
            status: 204
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if(!deletedGame) {
            response.status= 404;
            response.message= {"message" : "Game ID not found"};
        }
        res.status(response.status).json(response.message);
    });
};
var mongoose= require("mongoose");
mongoose.set("useCreateIndex", true);
var Game= mongoose.model("Game");

var _addPublisher= function(req, res, game) {
    game.publisher.name= req.body.name;
    game.publisher.location.coordinates= [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, updatedGame) {
        var response= {
            status: 201,
            message: []
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else {
            response.message= updatedGame.publisher;
        }
        res.status(response.status).json(response.message);
    });
}

var _updatePublisher= function(req, res, game) {
    game.publisher.name= req.body.name;
    game.publisher.location.coordinates= [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, updatedGame) {
        var response= {
            status: 204
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

var _deletePublisher= function(req, res, game) {
    game.publisher.remove();
    game.save(function(err, game) {
        var response= {
            status: 204
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherGet= function(req, res) {

    var gameId = req.params.gameId;
    console.log("Get gameId ", gameId);
    Game.findById(gameId).exec(function (err, game) {
        var response= {
            status: 200,
            message: []
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if(!game) {
            response.status= 404;
            response.message= {"message" : "Game ID not found "+gameId};
        } else {
            console.log("game "+game);
            response.message= game.publisher ? game.publisher : [];
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.publisherAdd= function(req, res) {
    var gameId = req.params.gameId;
    console.log("Post gameId ", gameId);
    Game.findById(gameId).exec(function (err, game) {
        var response= {
            status: 200,
            message: []
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if(!game) {
            response.status= 404;
            response.message= {"message" : "Game ID not found "+gameId};
        } 
        if (game) {
            if (!(game.publisher)) {
                game.publisher= {name: "empty", location: []};
            }
            // console.log("Found publisher", game.publisher);
            _addPublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }
    });
};

module.exports.publisherUpdate = function (req, res) {
    var gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("-reviews").exec(function (err, game) {
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
            _updatePublisher(req, res, game);
        }
    });
};

module.exports.publisherDelete = function (req, res) {
    var gameId = req.params.gameId;
    console.log("DELETE gameId ", gameId);
    Game.findById(gameId).select("-reviews").exec(function (err, game) {
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
            _deletePublisher(req, res, game);
        }
    });
};
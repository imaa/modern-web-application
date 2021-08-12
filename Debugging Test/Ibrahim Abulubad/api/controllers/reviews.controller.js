var mongoose= require("mongoose");
mongoose.set("useCreateIndex", true);
var Game= mongoose.model("Game");

module.exports.reviewGetAll= function(req, res) {

    var offset= 0;
    var count= 5;
    if(req.query && req.query.offset) {
        offset= parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count) {
        count= parseInt(req.query.count, 10);
    }
    var gameId= req.params.gameId;

    Game.findById(gameId).select("reviews").skip(offset).limit(count).exec(function(err, doc) {
        console.log("Found reviews", doc.reviews.length);
        res.json(doc.reviews);
    })
};

module.exports.reviewGetOne= function(req, res) {
    var gameId= req.params.gameId;
    var reviewId= req.params.reviewId;
    console.log("GET reviewId "+ reviewId+ " for gameId "+ gameId);
    Game.findById(gameId).select("reviews").exec(function(err, game) {
        var review= game.reviews.id(reviewId);
        res.status(200).json(review);
    });
};

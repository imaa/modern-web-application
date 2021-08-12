var express= require("express");
var router= express.Router();
var controllerGames= require("../controllers/games.controller");
var controllerPublisher= require("../controllers/publisher.controller")
var controllerReviews= require("../controllers/reviews.controller");
var controllerUsers= require("../controllers/users.controller.js");

router.route("/games")
      .get(controllerGames.gameGetAll)
      .post(controllerUsers.authenticate);

router.route("/games/:gameId")
      .get(controllerGames.gameGetOne)
      .put(controllerGames.gameUpdateOne)
      .delete(controllerGames.gameDeleteOne);

router.route("/games/:gameId/publisher")
      .get(controllerPublisher.publisherGet)
      .post(controllerPublisher.publisherAdd)
      .put(controllerPublisher.publisherUpdate)
      .delete(controllerPublisher.publisherDelete);

router.route("/games/:gameId/reviews").get(controllerReviews.reviewGetAll);

router.route("/games/:gameId/reviews:reviewId").get(controllerReviews.reviewGetOne);

router.route("/users/register").post(controllerUsers.register);

router.route("/users/login").post(controllerUsers.login);

module.exports = router;
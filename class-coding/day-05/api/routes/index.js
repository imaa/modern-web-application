const express = require("express");
const { getAll, getSingedGame } = require("../controllers/games.controller");
const router = express.Router();
router.route("/games").get(getAll);
router.route("/games/:gameId").get(getSingedGame);
module.exports = router;

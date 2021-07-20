const express = require("express");
const router = express.Router();
const apiConfig = require("../config/route-config");
const { addGame, gamesGetAll, getSingle } = require("../controllers/games.controller");


router.route(apiConfig.api.games).get(gamesGetAll).post(addGame);
router.route(apiConfig.api.games + apiConfig.idParam).get(getSingle);

module.exports = router;
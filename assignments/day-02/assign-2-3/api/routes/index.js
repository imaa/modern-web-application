const express = require("express");
const configs = require("../configs/api-config");
const router = express.Router();
const { games } = require("../controllers/games.controller");
router.route(configs.games.base).get(games.getAll);

module.exports = router;

const express = require("express");
const getAll = require("../controllers/games.controller");
const router = express.Router();
router.route("/games").get(getAll)
module.exports = router;
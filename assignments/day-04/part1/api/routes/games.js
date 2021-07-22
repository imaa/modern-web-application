const express = require("express");
const { getAll, getSingle } = require("../controllers/games.controller");
const router = express.Router();
router.route("/games").get(getAll);
router.route("/games/:id").get(getSingle);
module.exports = router;

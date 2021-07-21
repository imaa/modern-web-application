const { games } = require("../controllers/games.controller");

const router = require("express").Router();
router.get("/games", games.getAll);
module.exports = router;

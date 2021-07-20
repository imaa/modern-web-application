const express = require("express");
const configs = require("../config/api-configs");
const { caluclater } = require("../controllers/calculater.controller");

const router = express.Router();
router.get(configs.calculater.base + configs.calculater.num1, caluclater.calc);

module.exports = router;

const { login, register } = require("../controllers/account.controller");
const express = require("express");
const apiConfig = require("../configs/api.config");
const accountRouter = express.Router();
accountRouter.route(apiConfig.account.login()).post(login);
accountRouter.route(apiConfig.account.register()).post(register);
module.exports = accountRouter;

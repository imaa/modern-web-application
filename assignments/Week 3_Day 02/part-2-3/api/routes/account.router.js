const configs = require("../configs/api-config");
const { login, register } = require("../controllers/account.controller");
const express = require("express");
const accountRouter = express.Router();
accountRouter.route(configs.account.login()).post(login);
accountRouter.route(configs.account.register()).post(register);
module.exports = accountRouter;

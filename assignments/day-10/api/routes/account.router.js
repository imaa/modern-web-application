const configs = require("../configs");
const { login, register } = require("../controllers/account.controller");

module.exports.config = (router) => {
  router.route(configs.apiConfig.account.login()).post(login);
  router.route(configs.apiConfig.account.register()).post(register);
};

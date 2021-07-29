const apiConfig = require("../configs/api.config");
const ideRouter = require("./ide.router");
const plRouter = require("./programingLanguage.router");

module.exports.config = (app) => {
  app.use(apiConfig.apiPrefix, plRouter);
  app.use(apiConfig.apiPrefix, ideRouter);
};

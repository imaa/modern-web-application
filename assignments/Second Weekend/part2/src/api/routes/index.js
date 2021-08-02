const accountRouter = require("./account.router");
const ideRouter = require("./ide.router");
const plRouter = require("./programingLanguage.router");

module.exports = {
  plRouter: plRouter,
  ideRouter: ideRouter,
  accountRouter: accountRouter,
};

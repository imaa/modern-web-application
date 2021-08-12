const express = require("express");
const apiConfig = require("../configs/api.config");
const { authenticate } = require("../controllers/account.controller");
const {
  getIDEs,
  saveIDE,
  getIDE,
  updateFullIDE,
  updatePartialIDE,
  deleteIDE,
} = require("../controllers/ide.controller");

const ideRouter = express.Router();
ideRouter.route(apiConfig.pls.ides.path()).get(getIDEs).post(authenticate, saveIDE);
ideRouter.route(apiConfig.pls.ides.full()).get(getIDE).put(updateFullIDE).patch(updatePartialIDE).delete(deleteIDE);
module.exports = ideRouter;

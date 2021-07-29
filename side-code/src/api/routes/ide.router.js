const express = require("express");
const apiConfig = require("../configs/api.config");
const {
  getIDEs,
  saveIDE,
  getIDE,
  updateFullIDE,
  updatePartialIDE,
  deleteIDE,
} = require("../controllers/ide.controller");

module.exports.config = (router) => {
  router.route(apiConfig.pls.ides.path()).get(getIDEs).post(saveIDE);
  router.route(apiConfig.pls.ides.full()).get(getIDE).put(updateFullIDE).patch(updatePartialIDE).delete(deleteIDE);
};

const express = require("express");
const apiConfig = require("../configs/api.config");
const {
  getProgramingLanguages,
  saveProgramingLanguage,
  getProgramingLanguage,
  updateFullProgramingLanguage,
  updatePartialProgramingLanguage,
  deleteProgramingLanguage,
} = require("../controllers/programingLanguages.controller");

const plRouter = express.Router();

plRouter
  .route(apiConfig.pls.path())
  .get(getProgramingLanguages)
  .post(saveProgramingLanguage);
plRouter
  .route(apiConfig.pls.full())
  .get(getProgramingLanguage)
  .put(updateFullProgramingLanguage)
  .patch(updatePartialProgramingLanguage)
  .delete(deleteProgramingLanguage);
module.exports = plRouter;

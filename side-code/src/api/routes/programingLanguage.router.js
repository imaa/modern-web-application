const apiConfig = require("../configs/api.config");
const {
  getProgramingLanguages,
  saveProgramingLanguage,
  getProgramingLanguage,
  updateFullProgramingLanguage,
  updatePartialProgramingLanguage,
  deleteProgramingLanguage,
} = require("../controllers/programingLanguages.controller");

module.exports.config = (router) => {
  router.route(apiConfig.pls.path()).get(getProgramingLanguages).post(saveProgramingLanguage);
  router
    .route(apiConfig.pls.full())
    .get(getProgramingLanguage)
    .put(updateFullProgramingLanguage)
    .patch(updatePartialProgramingLanguage)
    .delete(deleteProgramingLanguage);
};

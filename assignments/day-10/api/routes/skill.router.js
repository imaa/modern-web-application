const configs = require("../configs");
const {
  addSkill,
  getSkills,
  getSkill,
  deleteSkill,
  updateFullSkill,
  updatePartialSkill,
} = require("../controllers/skills.controller");
module.exports.config = (router) => {
  router.route(configs.apiConfig.job.skill.path()).post(addSkill).get(getSkills);
  router
    .route(configs.apiConfig.job.skill.full())
    .get(getSkill)
    .delete(deleteSkill)
    .put(updateFullSkill)
    .patch(updatePartialSkill);
};

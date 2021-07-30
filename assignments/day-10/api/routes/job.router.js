const configs = require("../configs");
const {
  addJob,
  getJobs,
  getJob,
  deleteJob,
  updateFullJob,
  updatePartialJob,
} = require("../controllers/jobs.controller");

module.exports.config = (router) => {
  router.route(configs.apiConfig.job.path()).post(addJob).get(getJobs);
  router.route(configs.apiConfig.job.full()).get(getJob).delete(deleteJob).put(updateFullJob).patch(updatePartialJob);
};

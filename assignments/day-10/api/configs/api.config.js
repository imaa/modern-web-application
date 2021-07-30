const _paramPrefix = ":";
const config = {
  apiPrefix: "/api",
  assets: "/assets",
  job: {
    id: () => "id",
    path: () => "/jobs/",
    full: () => config.job.path() + _paramPrefix + config.job.id(),
    maxListLimit: () => 20,
    defaultListLimit: () => 5,
    skill: {
      id: () => "sId",
      path: () => config.job.full() + "/skills/",
      full: () => config.job.skill.path() + _paramPrefix + config.job.skill.id(),
      maxListLimit: () => 20,
      defaultListLimit: () => 5,
    },
    review: {
      id: () => "rId",
      path: () => config.job.full() + "/reviews/",
      full: () => config.job.review.path() + _paramPrefix + config.job.review.id(),
      maxListLimit: () => 50,
      defaultListLimit: () => 5,
    },
  },
  user: {
    id: () => "id",
    path: () => "/users/",
    full: () => config.user.path() + _paramPrefix + config.user.id(),
    maxListLimit: () => 20,
    defaultListLimit: () => 5,
  },
  account: {
    id: () => "id",
    path: () => "/accounts/",
    login: () => config.account.path() + "login",
    register: () => config.account.path() + "register",
  },
};

module.exports.apiConfig = config;

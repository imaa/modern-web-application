const paramsPrefix = ":";
const configs = {
  apiPrefix: "/api",
  games: {
    id: () => "id",
    pathId: () => paramsPrefix + configs.games.id(),
    path: () => "/games",
    full: () => `${configs.games.path()}/${configs.games.pathId()}`,
    maxListCount: () => 50,
    defaultListCount: () => 5,
  },
  account: {
    id: () => "id",
    path: () => "/accounts/",
    login: () => configs.account.path() + "login",
    register: () => configs.account.path() + "register",
  },
};

module.exports = configs;

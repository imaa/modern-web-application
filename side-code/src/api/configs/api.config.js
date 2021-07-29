const paramsPrefix = ":";
const apiConfig = {
  apiPrefix: "/api",
  //programing languages path configuration
  pls: {
    id: () => "plId",
    pathId: () => paramsPrefix + apiConfig.pls.id(),
    path: () => "/programingLanguages",
    full: () => `${apiConfig.pls.path()}/${apiConfig.pls.pathId()}`,
    maxListCount: () => 50,
    defaultListCount: () => 5,
    //programing languages IDEs path configuration
    ides: {
      id: () => "ideId",
      pathId: () => paramsPrefix + apiConfig.pls.ides.id(),
      path: () => `${apiConfig.pls.full()}/ides`,
      full: () => `${apiConfig.pls.ides.path()}/${apiConfig.pls.ides.pathId()}`,
      maxListCount: () => 20,
      defaultListCount: () => 5,
    },
  },
};

module.exports = apiConfig;

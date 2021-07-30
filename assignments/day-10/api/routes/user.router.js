const configs = require("../configs");
const {
  addUser,
  getUsers,
  getUser,
  deleteUser,
  updateFullUser,
  updatePartialUser,
} = require("../controllers/users.controller");

module.exports.config = (router) => {
  router.route(configs.apiConfig.user.path()).post(addUser).get(getUsers);
  router
    .route(configs.apiConfig.user.full())
    .get(getUser)
    .delete(deleteUser)
    .put(updateFullUser)
    .patch(updatePartialUser);
};

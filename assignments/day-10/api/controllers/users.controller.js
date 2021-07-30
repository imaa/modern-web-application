const mongoose = require("mongoose");
const configs = require("../configs");
const { HTTP_STATUS } = require("../helpers/httpStatus");
const { numbers } = require("../helpers/numbers");
const { jobResponse, completeRequest } = require("../helpers/response");
const { register } = require("./account.controller");
const User = mongoose.model(configs.dbConfig.models.user.name);
function getUsers(req, res) {
  User.find()
    .skip(req.query.skip >= 0 ? numbers.getInt(req.query.skip) : 0)
    .limit(
      req.query.limit > 0 && req.query.limit <= configs.apiConfig.user.maxListLimit()
        ? numbers.getInt(req.query.limit)
        : configs.apiConfig.user.defaultListLimit()
    )
    .exec((err, users) => {
      let response = jobResponse(HTTP_STATUS.OK, users);
      if (err) {
        response = serverErrorResponse();
      }
      completeRequest(res, response);
    });
}
function getUser(req, res) {
  const _id = req.params[configs.apiConfig.user.id()];
  User.findById(_id).exec((err, user) => {
    let response = jobResponse(HTTP_STATUS.OK, user);
    if (err) {
      response = serverErrorResponse();
    }
    if (!user) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `User with the following id ${_id} not found` };
    }
    completeRequest(res, response);
  });
}
function deleteUser(req, res) {
  const _id = req.params[configs.apiConfig.user.id()];
  let response = jobResponse(HTTP_STATUS.NO_CONTENT, null);
  User.findOneAndDelete(_id).exec((err, user) => {
    if (err) {
      response = serverErrorResponse();
    }
    if (!user) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `User with the following id ${_id} not found` };
    }
    completeRequest(res, response);
  });
}
function addUser(req, res) {
  register(req, res);
}
function updateFullUser(req, res) {
  _updateUser(true, req, res);
}
function updatePartialUser(req, res) {
  _updateUser(false, req, res);
}
function _updateUser(isFullUpdate, req, res) {
  const _id = req.params[configs.apiConfig.user.id()];
  const userUpdate = {};
  if (!req.body.name || isFullUpdate) {
    userUpdate.name = req.body.name;
  }
  if (!req.body.userName || isFullUpdate) {
    userUpdate.userName = req.body.userName;
  }
  User.findByIdAndUpdate(_id, userUpdate, (err, doc) => {
    let response = jobResponse(HTTP_STATUS.NO_CONTENT, null);
    if (err) {
      response = serverErrorResponse();
    }
    if (!doc) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `User with the following id ${_id} not found` };
    }
    completeRequest(res, response);
  });
}
module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  updateFullUser: updateFullUser,
  updatePartialUser: updatePartialUser,
  deleteUser: deleteUser,
  addUser: addUser,
};

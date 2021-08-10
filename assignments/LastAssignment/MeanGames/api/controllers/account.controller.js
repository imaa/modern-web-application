const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const {
  meanGamesResponse,
  completeRequest,
  serverErrorResponse,
  unauthorizedResponse,
} = require("../../helpers/response");
const { HTTP_STATUS } = require("../../helpers/httpStatus");
const User = mongoose.model("User");

const register = (req, res) => {
  let response = meanGamesResponse(HTTP_STATUS.CREATED, null);
  if (req.body.userName.trim() === "" || req.body.password === "") {
    response.status = HTTP_STATUS.NOT_ACCEPTED;
    response.data = { message: "please provide user name and password" };
    completeRequest(res, response);
  } else if (req.body.password !== req.body.confirmPassword) {
    response.status = HTTP_STATUS.NOT_ACCEPTED;
    response.data = { message: "password should match the confirm password" };
    completeRequest(res, response);
  } else {
    bcrypt.genSalt(10).then(saltGeneratorSuccess.bind(null, res, req)).catch(saltGeneratorFailure.bind(null, res));
  }
};
const saltGeneratorFailure = (res, err) => {
  console.log(err);
  completeRequest(res, serverErrorResponse());
};
const saltGeneratorSuccess = (res, req, salt) => {
  bcrypt
    .hash(req.body.password, salt)
    .then(passwordEncryptionSuccess.bind(null, req, res))
    .catch(passwordEncryptionFailure.bind(null, res));
};
const passwordEncryptionSuccess = (req, res, encryptedPassword) => {
  const newUser = new User({
    name: req.body.name,
    userName: req.body.userName,
    password: encryptedPassword,
  });
  User.create(newUser).then(createUserSuccess.bind(null, res)).catch(createUserFailure.bind(null, res));
};
createUserFailure = (res, err) => {
  console.log(err);
  completeRequest(res, serverErrorResponse());
};
const createUserSuccess = (err, createdUser) => {
  createdUser.password = null;
  completeRequest(res, meanGamesResponse(HTTP_STATUS.CREATED, createdUser));
};
passwordEncryptionFailure = (res, err) => {
  console.log(err);
  completeRequest(res, serverErrorResponse());
};

const login = (req, res) => {
  let response = meanGamesResponse(HTTP_STATUS.OK, null);
  if (!req.body.userName || !req.body.password) {
    response.status = HTTP_STATUS.NOT_ACCEPTED;
    response.data = { message: "please provide user name and password" };
    completeRequest(res, response);
    console.log(err);
  } else {
    User.findOne({ userName: req.body.userName })
      .exec()
      .then(userFindOneSuccess.bind(null, req, res))
      .catch(userFindOneFailure.bind(null, res));
  }
};
const userFindOneFailure = (res, err) => {
  console.log(err);
  completeRequest(res, serverErrorResponse());
};
const userFindOneSuccess = (req, res, user) => {
  if (!user) {
    let response = unauthorizedResponse();
    completeRequest(res, response);
  } else {
    bcrypt
      .compare(req.body.password, user.password)
      .then(comparePasswordSuccess.bind(null, res, user))
      .catch(comparePasswordFailure.bind(null, res));
  }
};
const comparePasswordFailure = (res, err) => {
  console.log(err);
  completeRequest(res, serverErrorResponse());
};
const comparePasswordSuccess = (res, user, match) => {
  if (match) {
    jwt.sign(
      {
        id: user._id,
        name: user.name,
        userName: user.userName,
      },
      process.env.HASH_PASS,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      },
      (err, encodedToken) => {
        if (err) {
          console.log(err);
          completeRequest(res, serverErrorResponse());
        } else {
          completeRequest(res, meanGamesResponse(HTTP_STATUS.OK, { token: encodedToken }));
        }
      }
    );
  } else {
    response = unauthorizedResponse();
    completeRequest(res, response);
  }
};
const authenticate = function (req, res, next) {
  var headerExists = req.headers.Authorization;
  if (headerExists) {
    var token = req.headers.Authorization.split(" ")[1];
    jwt.verify(token, process.env.HASH_PASS, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json("Unauthorized");
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json("No token provided");
  }
};
module.exports = {
  login: login,
  register: register,
  authenticate: authenticate,
};

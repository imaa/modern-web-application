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
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(salt);
        response = serverErrorResponse();
        completeRequest(res, response);
      } else {
        bcrypt.hash(req.body.password, salt, (err, encryptedPassword) => {
          if (err) {
            response = serverErrorResponse();
            completeRequest(res, response);
          } else {
            const newUser = new User({
              name: req.body.name,
              userName: req.body.userName,
              password: encryptedPassword,
            });
            User.create(newUser, (err, createdUser) => {
              if (err) {
                response = serverErrorResponse();
                console.log(err);
              } else {
                createdUser.password = null;
                response.data = createdUser;
              }
              completeRequest(res, response);
            });
          }
        });
      }
    });
  }
};
const login = (req, res) => {
  let response = meanGamesResponse(HTTP_STATUS.OK, null);
  if (!req.body.userName || !req.body.password) {
    response.status = HTTP_STATUS.NOT_ACCEPTED;
    response.data = { message: "please provide user name and password" };
    completeRequest(res, response);
    console.log(err);
  } else {
    User.findOne({ userName: req.body.userName }, (err, user) => {
      if (err) {
        response = serverErrorResponse();
        console.log(err);
        completeRequest(res, response);
      }
      if (!user) {
        response = unauthorizedResponse();
        completeRequest(res, response);
      } else {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (!err) {
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
                    response = serverErrorResponse();
                    completeRequest(res, response);
                  } else {
                    response.data = { token: encodedToken };
                    completeRequest(res, response);
                  }
                }
              );
            } else {
              response = unauthorizedResponse();
              completeRequest(res, response);
            }
          } else {
            response = serverErrorResponse();
            completeRequest(res, response);
          }
        });
      }
    });
  }
};
module.exports = {
  login: login,
  register: register,
};

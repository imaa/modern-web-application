const mongoose = require("mongoose");
const configs = require("../configs/config");
const { HTTP_STATUS } = require("../helpers/httpStatus");
const { weatherResponse, serverErrorResponse, completeRequest } = require("../helpers/response");
const Weather = mongoose.model(configs.models.weather.name);
const { numbers } = require("../helpers/numbers");
const _getQuery = (req) => {
  let query = {};
  if (req.query.lat && req.query.lng) {
    const _distance = numbers.getInt(req.query.distance) ?? 1000;
    const _lng = numbers.getFloat(req.query.lng);
    const _lat = numbers.getFloat(req.query.lat);
    query = {
      position: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [_lng, _lat],
          },
          $maxDistance: _distance,
          $minDistance: 0,
        },
      },
    };
  }
  return query;
};
const getAll = (req, res) => {
  const query = _getQuery(req);
  Weather.find(query)
    .skip(req.query.skip >= 0 ? numbers.getInt(req.query.skip) : 0)
    .limit(
      req.query.limit > 0 && req.query.limit <= configs.api.weather.maxListLimit()
        ? numbers.getInt(req.query.limit)
        : configs.api.weather.defaultListLimit()
    )
    .exec((err, data) => {
      let response = weatherResponse(HTTP_STATUS.OK, data);
      if (err) {
        response = serverErrorResponse();
        console.log("Get weather lsit", err);
      }
      completeRequest(res, response);
    });
};
const getSingle = (req, res) => {
  const _id = req.params[configs.api.weather.id()];
  Weather.findById(_id).exec((err, data) => {
    let response = weatherResponse(HTTP_STATUS.OK, data);
    if (err) {
      response = serverErrorResponse();
      console.log("Error in fining weather info ", _id, err);
    }
    if (!data) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `weather info with the profided id ${_id} not found` };
    }
    completeRequest(res, response);
  });
};
const saveOne = (req, res) => {};
const deleteOne = (req, res) => {
  const _id = req.params[configs.api.weather.id()];
  Weather.findByIdAndDelete(_id).exec((err, data) => {
    let response = weatherResponse(HTTP_STATUS.NO_CONTENT, data);
    if (err) {
      response = serverErrorResponse();
      console.log("Error in fining weather info ", _id, err);
    }
    if (!data) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `weather info with the profided id ${_id} not found` };
    }
    completeRequest(res, response);
  });
};
const partialUpdate = (req, res) => {
  _updateOne(false, req, res);
};
const fullUpdate = (req, res) => {
  _updateOne(true, req, res);
};

const _updateOne = (isFullUpdate, req, res) => {};

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  saveOne: saveOne,
  deleteOne: deleteOne,
  partialUpdate: partialUpdate,
  fullUpdate,
  fullUpdate,
};

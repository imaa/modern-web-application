const { config } = require("dotenv");
const e = require("express");
const mongoose = require("mongoose");
const configs = require("../configs");
const { HTTP_STATUS } = require("../helpers/httpStatus");
const { numbers } = require("../helpers/numbers");
const { jobResponse, completeRequest, serverErrorResponse } = require("../helpers/response");
const Job = mongoose.model(configs.dbConfig.models.job.name);
function getReviews(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const skip = req.query.skip >= 0 ? numbers.getInt(req.query.skip) : 0;
  const limit =
    req.query.limit > 0 && req.query.limit <= configs.apiConfig.job.review.maxListLimit()
      ? numbers.getInt(req.query.limit)
      : configs.apiConfig.job.review.defaultListLimit();

  Job.findById(_id, "+reviews")
    .select({
      reviews: { $slice: [skip, limit + skip] },
    })
    .exec((err, job) => {
      let response = jobResponse(HTTP_STATUS.OK, job?.reviews);
      if (err) {
        response = serverErrorResponse();
      }
      if (!job) {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.data = { message: `Job with the following id ${_id} not found` };
      }
      completeRequest(res, response);
    });
}
function getReview(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const _rid = req.params[configs.apiConfig.job.review.id()];
  Job.findById(_id, "+reviews").exec((err, job) => {
    let response = jobResponse(HTTP_STATUS.OK, null);
    if (err) {
      response = serverErrorResponse();
    }
    if (!job) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
    } else {
      review = job.reviews.id(_rid);
      if (!review) {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.data = { message: `Review with the following id ${_id} not found` };
      } else {
        response.status = HTTP_STATUS.OK;
        response.data = review;
      }
    }
    completeRequest(res, response);
  });
}
function deleteReview(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const _rid = req.params[configs.apiConfig.job.review.id()];
  Job.findById(_id, "+reviews").exec((err, job) => {
    let response = jobResponse(HTTP_STATUS.NO_CONTENT, null);
    if (err) {
      response = serverErrorResponse();
      completeRequest(res, response);
    }
    if (!job) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
      completeRequest(res, response);
    } else {
      review = job.reviews.id(_rid);
      if (!review) {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.data = { message: `Review with the following id ${_id} not found` };
        completeRequest(res, response);
      } else {
        job.reviews.pull(_rid);
        job.save((err, job) => {
          if (err) {
            response.status = HTTP_STATUS.SERVER_ERROR;
            response.data = { message: "Error occurred while adding new review" };
          } else {
            response.data = review;
          }
          completeRequest(res, response);
        });
      }
    }
  });
}
function addReview(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const review = {
    _id: mongoose.Types.ObjectId(),
    review: req.body.review,
    nameOfReviewer: req.body.nameOfReviewer,
  };
  Job.findById(_id, "+reviews").exec((err, job) => {
    let response = jobResponse(HTTP_STATUS.CREATED, null);
    if (err) {
      response = serverErrorResponse();
      completeRequest(res, response);
      console.log(err);
      console.log(req.body);
    } else if (!job) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
      completeRequest(res, response);
    } else {
      job.reviews.push(review);
      job.save((err, job) => {
        if (err) {
          response.status = HTTP_STATUS.SERVER_ERROR;
          response.data = { message: "Error occurred while adding new review" };
        } else {
          response.data = review;
        }
        completeRequest(res, response);
      });
    }
  });
}
function updateFullReview(req, res) {
  _updateReview(true, req, res);
}
function updatePartialReview(req, res) {
  _updateReview(false, req, res);
}
function _updateReview(isFullUpdate, req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const _rid = req.params[configs.apiConfig.job.review.id()];
  Job.findById(_id, "+reviews").exec((err, job) => {
    let response = jobResponse(HTTP_STATUS.NO_CONTENT, null);
    if (err) {
      response = serverErrorResponse();
      completeRequest(res, response);
    } else if (!job) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
      completeRequest(res, response);
    } else {
      review = job.reviews.id(_rid);
      if (req.body.review || isFullUpdate) {
        review.review = req.body.review;
      }
      if (req.body.nameOfReviewer || isFullUpdate) {
        review.nameOfReviewer = eq.body.nameOfReviewer;
      }
      job.save((err, job) => {
        if (err) {
          response = serverErrorResponse();
        }
        completeRequest(res, response);
      });
    }
  });
}
module.exports = {
  getReview: getReview,
  getReviews: getReviews,
  updateFullReview: updateFullReview,
  updatePartialReview: updatePartialReview,
  deleteReview: deleteReview,
  addReview: addReview,
};

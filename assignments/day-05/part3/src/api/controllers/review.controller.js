const { request } = require("express");
const { findGameById } = require("./game.controller");

const addReview = (req, res) => {
  findGameById(req.params.id, "reviews", (response) => {
    if (response.status == 200) {
      const game = response.message;
      const review = {
        name: req.body.name,
        review: req.body.review,
        date: new Date(),
      };
      if (game.reviews.length == 1 && game.reviews[0] == "") {
        //this line is ride of old incorrect data
        //TODO: update all from mongo shell
        game.reviews = [];
      }
      game.reviews.push(review);
      game.save((err, doc) => {
        if (err) {
          response.status = 500;
          response.message = {
            error: "Error occurred while saving the review ",
            errors: err,
          };
        } else {
          response.message = doc;
        }
        res.status(response.status).json(response.message);
      });
    } else {
      res.status(response.status).json(response.message);
    }
  });
};
const getReview = (req, res) => {
  findGameById(req.params.id, "reviews", (response) => {
    if (response.status == 200) {
      const review = response.message.reviews.id(req.params.rid);
      if (!review) {
        response.status = 404;
        response.message = `Review with the id ${req.params.rid} not found`;
      } else {
        response.message = review;
      }
    }
    res.status(response.status).json(response.message);
  });
};
const getReviews = (req, res) => {
  findGameById(req.params.id, "reviews", (response) => {
    res.status(response.status).json(response.message.reviews);
  });
};
const _updateReview = (isFullUpdate = false, req, res) => {
  findGameById(req.params.id, "reviews", (response) => {
    if (response.status === 200) {
      const game = response.message;
      const review = game.reviews.id(req.params.rid);
      if (!review) {
        response.status = 404;
        response.message = `Review with the id ${req.params.rid} not found`;
        res.status(response.status).json(response.message);
      } else {
        if (req.body.name || isFullUpdate) {
          review.name = req.body.name;
        }
        if (req.body.review || isFullUpdate) {
          review.review = req.body.review;
        }
        game.save((err) => {
          if (err) {
            response.status = 500;
            response.message = {
              error: "Error occurred while saving the document ",
              errors: err,
            };
          }
          res.status(response.status).json(review);
        });
      }
    } else {
      res.status(response.status).json(response.message);
    }
  });
};
const updateFullReview = (req, res) => {
  _updateReview(true, req, res);
};
const updatePartialReview = (req, res) => {
  _updateReview(false, req, res);
};
const deleteReview = (req, res) => {
  findGameById(req.params.id, "reviews", (response) => {
    if (response.status == 200) {
      const game = response.message;
      const review = game.reviews.id(req.params.rid);
      console.log(review);
      if (!review) {
        response.status = 404;
        response.message = `Review with the id ${req.params.rid} not found`;
        res.status(response.status).json(response.message);
      } else {
        game.reviews.pull(review);
        game.save((err, doc) => {
          if (err) {
            response.status = 500;
            response.message = {
              error: "Error occurred while removing the review ",
              errors: err,
            };
          } else {
            response.message = review;
          }
          res.status(response.status).json(response.message);
        });
      }
    } else {
      res.status(response.status).json(response.message);
    }
  });
};

module.exports = {
  addReview: addReview,
  getReview: getReview,
  getReviews: getReviews,
  updateFullReview: updateFullReview,
  updatePartialReview: updatePartialReview,
  deleteReview: deleteReview,
};

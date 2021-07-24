const express = require("express");
const {
  getReview,
  getReviews,
  updateFullReview,
  updatePartialReview,
  addReview,
  deleteReview,
} = require("../controllers/review.controller");

const reviewRouter = express.Router();
reviewRouter.route("/games/:id/reviews").get(getReviews).post(addReview);
reviewRouter
  .route("/games/:id/reviews/:rid")
  .get(getReview)
  .put(updateFullReview)
  .patch(updatePartialReview)
  .delete(deleteReview);
module.exports = reviewRouter;

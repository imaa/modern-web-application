const configs = require("../configs");
const {
  addReview,
  getReviews,
  getReview,
  deleteReview,
  updateFullReview,
  updatePartialReview,
} = require("../controllers/reviews.controller");
module.exports.config = (router) => {
  router.route(configs.apiConfig.job.review.path()).post(addReview).get(getReviews);
  router
    .route(configs.apiConfig.job.review.full())
    .get(getReview)
    .delete(deleteReview)
    .put(updateFullReview)
    .patch(updatePartialReview);
};

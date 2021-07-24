const express = require("express");
const {
  getPublisher,
  updateFullPublisher,
  updatePartialPublisher,
} = require("../controllers/publisher.controller");
const publisherRouter = express.Router();

publisherRouter
  .route("/games/:id/publisher")
  .get(getPublisher)
  .put(updateFullPublisher)
  .patch(updatePartialPublisher);
module.exports = publisherRouter;

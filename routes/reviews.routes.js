const express = require("express");
const { getReviewById, getCommentByReviewId, postCommentOnReview, patchReviewVotesById } = require("../controllers/reviewById.controller");
const { getReviews } = require("../controllers/reviews.controller");
const reviewsRouter = express.Router();

//--Routes to /api/reviews--//
reviewsRouter.route("/")
.get(getReviews)

//--Routes to /api/reviews/:review_id--//
reviewsRouter.route("/:review_id")
.get(getReviewById)
.patch(patchReviewVotesById)

//--Routes to /api/reviews/:review_id/comments--//
reviewsRouter.route("/:review_id/comments")
.get(getCommentByReviewId)
.post(postCommentOnReview)

module.exports = reviewsRouter;
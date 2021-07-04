const { selectReviewById, selectCommentByReviewId, insertCommentOnReview, updateVotesOnReview } = require("../models/reviewById.model");

exports.getReviewById = async (req, res, next) => {
    try {
        const review_id = req.params.review_id;
        const review = await selectReviewById(review_id);
        res.status(200).send({review});
    } catch (err) {
        next(err)
    }
}

exports.getCommentByReviewId =  async (req, res, next) => {
    try {
        const review_id = req.params.review_id;
        const comment = await selectCommentByReviewId(review_id);
        res.status(200).send({comment})
    } catch (err) {
        next(err);
    }
}

exports.postCommentOnReview = async (req, res, next) => {
    try {
        const newComment = req.body;
        const review_id = req.params.review_id
        const comment = await insertCommentOnReview(review_id, newComment);
        res.status(201).send({comment})
    } catch (err) {
        next(err);
    }
}

exports.patchReviewVotesById = async (req, res, next) => {
    try {
        const review_id = req.params;
        const countIncObj = req.body
        const review = await updateVotesOnReview(review_id, countIncObj)
        res.status(202).send({review});
    } catch (err) {
        next(err)
    }
}
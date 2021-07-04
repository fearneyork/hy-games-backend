const { selectAllReviews } = require("../models/reviews.model")


exports.getReviews = async (req, res, next) => {
    try {
        const query = req.query;
        const reviews = await selectAllReviews(query);
        res.status(200).send({reviews})
    } catch (err) {
        next(err)
    }
}
const db = require("../db/connection.js");
const { checkExists } = require("../db/utils/sql-handling.js");

exports.selectReviewById = async (review_id) => {
    const result = await db.query(`
    SELECT reviews.*, COUNT(comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id
    ;`, [review_id]);
    const review = result.rows[0]
    if (!review) {
        return Promise.reject({
            status: 404,
            msg: `No review found for review_id: ${review_id}`
        })
    }
    return review;
}

exports.selectCommentByReviewId = async (review_id) => {
    const result = await db
    .query("SELECT * FROM comments WHERE review_id = $1;", [review_id]);
    const rows = result.rows;
    if (!rows.length) {
        await checkExists("reviews", "review_id", review_id)
    }
    return rows;
}

exports.insertCommentOnReview = async (review_id, newComment) => {
    if (!newComment.hasOwnProperty('body') || !newComment.hasOwnProperty('created_by')) {
        return Promise.reject({
            status: 400,
            msg: `Missing required fields`
        })
    }
    const result = await db.query(`
    INSERT INTO comments
    (review_id, author, body)
    VALUES
    (
        $1,
        $2,
        $3
    )
    RETURNING *;
    `, [
        review_id,
        newComment.created_by,
        newComment.body
    ]
    )
    const rows = result.rows
    return rows;
}

exports.updateVotesOnReview = async ({review_id}, countIncObj) => {
    const result = await db.query('UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;', [countIncObj.inc_votes, review_id])
    const rows = result.rows;
    const row = rows[0];
    if (!row) {
        return Promise.reject({
            status: 404,
            msg: `No review found for review_id: ${review_id}`
        })
    }
    return row;
}
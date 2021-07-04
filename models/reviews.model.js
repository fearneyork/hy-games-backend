const db = require("../db/connection.js");
const { checkExists } = require("../db/utils/sql-handling.js");


exports.selectAllReviews = async ({sort_by = "created_at", order = "desc", category = "all"}) => {
    if(!["title", "owner", "category", "created_at", "votes"].includes(sort_by)) {
        return Promise
        .reject({status: 400, msg: "Invalid sort query"})
    };
    if (!["asc", "desc"].includes(order)) {
        return Promise
        .reject({status: 400, msg: "Invalid order query"})
    };
    if (!['euro game', 'social deduction', 'dexterity', 'children\'s games', 'all'].includes(category)) {
        return Promise
        .reject({status: 400, msg: "Invalid category query"})
    }
    let queryStr = `
        SELECT reviews.*, COUNT(comments.review_id) AS comment_count
        FROM reviews
        LEFT JOIN comments ON comments.review_id = reviews.review_id
    `;
    if (category !== 'all') {
        const formatCategory = category.replace("'", "''")
        queryStr += ` WHERE category = '${formatCategory}'`;
    }
    queryStr += `   
        GROUP BY reviews.review_id
        ORDER BY ${sort_by} ${order};
    `

    const dbResult = await db.query(queryStr)
    const result = dbResult.rows;
    return result;
}


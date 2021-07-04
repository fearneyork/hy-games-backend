//--Imports data manipulation functions, test-data, db connection, and the pg-formatting tool--//
const { formatCategoriesData ,formatUsersData ,formatReviewsData, formatCommentsData, lookUpObj} = require('../utils/data-manipulation');
const { categoryData, commentData, reviewData, userData } = require('../data/test-data/index');
const db = require('../connection');
const format = require("pg-format");

//--Function to create a query string and queries the db using that string--//
async function createCategories() {
    const categoriesValues = formatCategoriesData(categoryData);
    const categoriesInsert = format(
        `INSERT INTO categories
        (slug, description)
        VALUES
        %L
        RETURNING *;`, categoriesValues
        );
    await db.query(categoriesInsert)

}

//--Function to create a query string and queries the db using that string--//
async function createUsers() {
    const usersValues = formatUsersData(userData);
    const usersInsert = format(
        `INSERT INTO users
        (username, avatar_url, name)
        VALUES
        %L
        RETURNING *;`, usersValues
        );
    await db.query(usersInsert)
}

//--Function to create a query string and queries the db using that string--//
async function createReviews() {
    const reviewsValues = await formatReviewsData(reviewData);
    const reviewInsert = await format(
        `INSERT INTO reviews
        (
        title,
        review_body,
        designer,
        review_img_url,
        votes,
        category,
        owner,
        created_at
        )
        VALUES
        %L
        RETURNING *;`, reviewsValues
        );
    const result = await db.query(reviewInsert);

    const reviewRowsData = result.rows
    const reviewLookUp = await lookUpObj(reviewRowsData);
    return reviewLookUp;
    }

//--Function to create a query string and queries the db using that string--//
async function createComments(reviewLookUp) {
    const commentsValues = formatCommentsData(commentData, reviewLookUp);
    const commentsInsert = format(
        `INSERT INTO comments
        (author, review_id, votes, created_at, body)
        VALUES
        %L
        RETURNING *;`, commentsValues
        );
    await db.query(commentsInsert)
}

async function checkExists(table, column, value) {
    const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column);
    const dbResult = await db.query(queryStr, [value])
    if (!dbResult.rows.length) {
        return Promise.reject({
            status: 404,
            msg: `No review found for review_id: ${value}`
        });
    }
}

module.exports = {createCategories, createUsers , createReviews, createComments, checkExists};
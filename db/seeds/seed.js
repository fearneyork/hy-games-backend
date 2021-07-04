//--Import db connection and SQL-handling utilities--//
const db = require('../connection');
const { createCategories , createUsers , createReviews, createComments} = require('../utils/sql-handling');

//--Sets the seed for the db--//
const seed = async () => {
await db.query(`DROP TABLE IF EXISTS categories, reviews, users, comments;`)

//--Creates categories table--//
await db.query(`
CREATE TABLE categories (
  slug VARCHAR(200) PRIMARY KEY,
  description VARCHAR(1000) NOT NULL
);`);

//--Creates users table--//
await db.query(`
CREATE TABLE users (
  username VARCHAR(200) PRIMARY KEY,
  avatar_url VARCHAR(1000) NOT NULL,
  name VARCHAR(200) NOT NULL
);`);

//--Creates reviews table--//
await db.query(`
CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  title VARCHAR(1000) NOT NULL,
  review_body VARCHAR(5000) NOT NULL,
  designer  VARCHAR(200) default 'no designer specified',
  review_img_url VARCHAR(1000) default 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
  votes INT default 0,
  category VARCHAR(200) REFERENCES categories(slug),
  owner VARCHAR(200) REFERENCES users(username),
  created_at TIMESTAMP default now()
);`);

//--Creates comments table--//
await db.query(`
CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  author VARCHAR(200) REFERENCES users(username) ON DELETE CASCADE,
  review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE,
  votes INT default 0,
  created_at TIMESTAMP default now(),
  body VARCHAR(5000) NOT NULL
);`);

//--Invocation of the insertion functions that populate db from data files--//
await createCategories();
await createUsers();
const reviewLookUp = await createReviews();
await createComments(reviewLookUp);

};



module.exports = seed;
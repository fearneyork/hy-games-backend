\c nc_games

-- SELECT * FROM categories;
-- SELECT * FROM users;
-- SELECT * FROM reviews;
-- SELECT review_id, title, designer, votes, category, owner, created_at  FROM reviews;
-- SELECT * FROM comments;

-- SELECT review_id, created_at, title FROM reviews ORDER BY created_at desc;

-- SELECT * FROM reviews WHERE review_id = 2;
-- SELECT * FROM comments WHERE review_id = 2;

-- UPDATE reviews
-- SET votes = votes + 1
-- WHERE review_id = 2
-- RETURNING *;

-- SELECT *
-- FROM reviews
-- JOIN comments ON comments.review_id = reviews.review_id;

-- SELECT *
-- FROM reviews
-- LEFT JOIN comments ON comments.review_id = reviews.review_id;

-- SELECT reviews.*, COUNT(comments.review_id) AS comment_count
-- FROM reviews
-- LEFT JOIN comments ON comments.review_id = reviews.review_id
-- WHERE category IN ('dexterity', 'social deduction')
-- GROUP BY reviews.review_id
-- ORDER BY created_at desc;

-- SELECT * FROM reviews
-- WHERE review_id = 1;

-- SELECT reviews.*, COUNT(comments.review_id) AS comment_count
-- FROM reviews
-- LEFT JOIN comments ON comments.review_id = reviews.review_id
-- WHERE reviews.review_id = 1
-- GROUP BY reviews.review_id
-- ;

SELECT * FROM reviews;

-- SELECT * FROM reviews WHERE category = 'dexterity';

-- SELECT reviews.*, COUNT(comments.review_id) AS comment_count
-- FROM reviews
-- LEFT JOIN comments ON comments.review_id = reviews.review_id
-- WHERE category = 'children''s games'   
-- GROUP BY reviews.review_id
-- ORDER BY created_at desc;

INSERT INTO comments
(review_id, author, body)
VALUES
(500, 'mallionaire', 'TEST BODY')
RETURNING *;

const request = require('supertest');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed  = require('../db/seeds/seed.js');
const app =require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api tests', () => {
    test('GET /api - status 200 - ', () => {
        return request(app)
        .get('/api')
        .expect(200)
    });
    test('GET /apt - status 404 ', () => {
        return request(app)
        .get('/apt')
        .expect(404)
    });
});

describe('/api/categories tests', () => {
    test('GET /api/categories should respond with an array of category objects, with the correct structure', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({body}) => {
            const categoryEntry = body.categories[0];
            expect(typeof categoryEntry).toBe("object")
            expect(categoryEntry).toHaveProperty("slug");
            expect(categoryEntry).toHaveProperty("description")
        })
    });
    test('GET /api/category', () => {
        return request(app)
        .get("/api/category")
        .expect(404)
        .then((res) => {
            expect(res.status).toBe(404)
        })
    });
});

describe('/api/reviews tests', () => {
    test('GET /api/reviews should respond with all reviews in an array of objects', () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then (({body}) => {
            const categoryEntry = body.reviews[0];
            expect(typeof body).toBe("object");
            expect(categoryEntry).toEqual(expect.objectContaining({
                review_id: expect.any(Number),
                title: expect.any(String),
                review_body: expect.any(String),
                comment_count: expect.any(String),
                review_img_url: expect.any(String),
                votes: expect.any(Number),
                category: expect.any(String),
                owner: expect.any(String),
                created_at: expect.any(String),
            }));
        })
    });
    test('GET /api/reviews should respond with all reviews in default order', () => {
        return request(app)
        .get("/api/reviews?sort_by=created_at&order=desc&category=all")
        .expect(200)
        .then(({body}) => {
            const categoryEntry = body.reviews[0];
            expect(categoryEntry.created_at).toEqual("2021-01-25T11:16:54.963Z")
        })
    });
    test('GET /api/notAReview should respond with an object with status 404', () => {
        return request(app)
        .get("/api/review")
        .expect(404)
        .then((res) => {
            expect(res.status).toBe(404)
        })
    });
    test('GET /api/reviews should respond with an object with status 400 and {msg: Invalid sort query}', () => {
        return request(app)
        .get("/api/reviews?sort_by=owners&order=desc")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({ msg: "Invalid sort query" }) 
        })
    });
    test('GET /api/reviews should respond with an object with status 400 and {msg: Invalid order query}', () => {
        return request(app)
        .get("/api/reviews?sort_by=owner&order=inc")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({ msg: "Invalid order query" }) 
        })
    });
    test('GET /api/reviews should respond with an object with status 400 and {msg: Invalid category query}', () => {
        return request(app)
        .get("/api/reviews?category=bananas")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({ msg: "Invalid category query" }) 
        })
    });
    test('GET /api/reviews should respond with an empty array of reviews when passed a valid category but that category has no entries', () => {
        const category = "children's games"
        return request(app)
        .get(`/api/reviews?category=${category}`)
        .expect(200)
        .then(({body}) => {
            expect(body.reviews).toEqual([])
        })
    });
});

describe('/api/reviews/:review_id tests', () => {
    test('GET /api/reviews/:not_a_review_id should respond with an object with {msg: Bad Request}', () => {
        return request(app)
        .get("/api/reviews/one")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toEqual("Bad Request");
        })
    });
    test('GET /api/reviews/:review_id should return an array of an object that\'s just one review that matches the review_id passed in', () => {
        return request(app)
        .get("/api/reviews/3")
        .expect(200)
        .then(({body}) => {
            const categoryEntry = body.review;
            expect(typeof categoryEntry).toBe("object");
            expect(categoryEntry.title).toBe('Ultimate Werewolf');
        })
    });
    test('GET /api/reviews/:not_a_review_id should respond with a status 404 and {msg: No review found for review_id: 100}', () => {
        return request(app)
        .get("/api/reviews/100")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("No review found for review_id: 100")
        })
    });
    test('PATCH /api/reviews/:review_id takes an object in the form `{ inc_votes: newVote }`, and respond with the updated review', () => {
        const patchObj = {inc_votes: 1}
        return request(app)
        .patch("/api/reviews/2")
        .expect(202)
        .send(patchObj)
        .then(({body}) => {
            expect(body.review.votes).toEqual(6);
        })
    });
    test('PATCH /api/reviews/:review_id takes an object in the form `{ inc_votes: newVote }`, and respond with the updated review with negative votes', () => {
        const patchObj = {inc_votes: -30}
        return request(app)
        .patch("/api/reviews/2")
        .expect(202)
        .send(patchObj)
        .then(({body}) => {
            expect(body.review.votes).toEqual(-25);
        })
    });
    test('PATCH /api/reviews/:review_id takes an object in the form `{ inc_votes: cat }`, and respond with the updated review', () => {
        const patchObj = {inc_votes: "cat"}
        return request(app)
        .patch("/api/reviews/2")
        .expect(400)
        .send(patchObj)
        .then(({body}) => {
            expect(body).toEqual({ msg: "Bad Request" }) 
        })
    });
    test('PATCH /api/reviews/:review_id takes an object in the form `{ inc_votes: "cat", name: "Harry" }`, and respond with 400', () => {
        const patchObj = {inc_votes: "cat", name: "Harry"}
        return request(app)
        .patch("/api/reviews/2")
        .expect(400)
        .send(patchObj)
        .then(({body}) => {
            expect(body).toEqual({ msg: "Bad Request" }) 
        })
    });
    test('PATCH /api/reviews/not_a_review_id returns a 400 and error message of Bad Request', () => {
        const patchObj = {inc_votes: -30}
        return request(app)
        .patch("/api/reviews/not_an_id")
        .expect(400)
        .send(patchObj)
        .then(({body}) => {
            expect(body).toEqual({ msg: "Bad Request" }) 
        })
    });
    test('PATCH /api/reviews/500', () => {
        const patchObj = {inc_votes: -30}
        return request(app)
        .patch("/api/reviews/500")
        .expect(404)
        .send(patchObj)
        .then(({body}) => {
            expect(body).toEqual({ msg: 'No review found for review_id: 500' }) 
        })
    });
});

describe('/api/reviews/:review_id/comments', () => {
    test('GET /api/reviews/3/comments for review_id 3 `ultimate werewolf` should return status 200 and an array of the comment object that replies to the specified review', () => {
        return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then(({body}) => {
            expect(body.comment.length).toBe(3);
            expect(body.comment[0]).toEqual(expect.objectContaining({
                comment_id: expect.any(Number),
                author: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String),
                body: expect.any(String)
            }))
        })
    });
    test('GET /api/reviews/500/comments for review_id 500 returns a 404 and error message of not found', () => {
        return request(app)
        .get("/api/reviews/500/comments")
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({ msg: 'No review found for review_id: 500' }) 
        })
    });
    test('GET /api/reviews/not_a_comment/comments for review_id 3 returns a 404 and error message of not found', () => {
        return request(app)
        .get("/api/reviews/not_a_comment/comments")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({ msg: "Bad Request" }) 
        })
    });
    test('GET /api/reviews/6/comments should respond with and empty array of comments for valid id with no comments', () => {
        return request(app)
        .get("/api/reviews/6/comments")
        .expect(200)
        .then(({body}) => {
            expect(body.comment).toEqual([])
        })
    });

    test('POST /api/reviews/:review_id/comments status 201 created comment object returned', () => {
        const newComment = {
            body: 'I\'m just a lowly villager',
            created_by: 'mallionaire',
        };
        return request(app)
        .post("/api/reviews/3/comments")
        .expect(201)
        .send(newComment)
        .then(({body}) => {
            const postedComment = body.comment[0]
            expect(postedComment).toEqual(expect.objectContaining({
                comment_id: expect.any(Number),
                author: 'mallionaire',
                review_id: 3,
                votes: 0,
                created_at: expect.any(String),
                body: 'I\'m just a lowly villager'
            }))
        })
    });
    test('POST /api/reviews/not_an_id/comments status 400 invalid ID', () => {
        const newComment = {
            body: 'I\'m just a lowly villager',
            created_by: 'mallionaire',
        };
        return request(app)
        .post("/api/reviews/fred/comments")
        .expect(400)
        .send(newComment)
        .then(({body}) => {
            expect(body.msg).toEqual("Bad Request");
        })
    });
    test('POST /api/reviews/500/comments status 404 valid ID, but no such content', () => {
        const newComment = {
            body: `I'm just a lowly villager`,
            created_by: 'mallionaire',
        };
        return request(app)
        .post("/api/reviews/500/comments")
        .expect(404)
        .send(newComment)
        .then(({body}) => {
            expect(body.msg).toEqual('Not found');
        })
    });
    test('POST /api/reviews/1/comments status 400 missing required fields', () => {
        const newComment = {
            body: `I'm just a lowly villager`,
        };
        return request(app)
        .post("/api/reviews/1/comments")
        .expect(400)
        .send(newComment)
        .then(({body}) => {
            expect(body.msg).toEqual('Missing required fields');
        })
    });
    test('POST /api/reviews/1/comments status 404 username doesn\'t exist', () => {
        const newComment = {
            body: `I'm just a lowly villager`,
            created_by: `harryyork`
        };
        return request(app)
        .post("/api/reviews/1/comments")
        .expect(404)
        .send(newComment)
        .then(({body}) => {
            expect(body.msg).toEqual('Not found');
        })
    });
    test('POST /api/reviews/1/comments status 201 ignores unnecessary properties', () => {
        const newComment = {
            body: `I'm just a lowly villager`,
            created_by: `mallionaire`,
            votes: 66
        };
        return request(app)
        .post("/api/reviews/3/comments")
        .expect(201)
        .send(newComment)
        .then(({body}) => {
            const postedComment = body.comment[0]
            expect(postedComment).toEqual(expect.objectContaining({
                comment_id: expect.any(Number),
                author: 'mallionaire',
                review_id: 3,
                votes: 0,
                created_at: expect.any(String),
                body: 'I\'m just a lowly villager'
            }))        })
    });
});
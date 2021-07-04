const express = require('express');
const { getApi } = require('../controllers/api.controller');
const categoriesRouter = require('./categories.routes');
const reviewsRouter = require('./reviews.routes');
const apiRouter = express.Router();

//--Route to GET /api--//
apiRouter.get('/', getApi);

//--Further Routes--//
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter)


module.exports = apiRouter;
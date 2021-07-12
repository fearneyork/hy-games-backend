//--Import express, error handlers, routingm and define the app--//
const express =require('express');
const { handleServerErrors, handleCustomErrors, handlePSQLErrors, handlePathError } = require('./errors/index.errors');
const apiRouter = require('./routes/api.routes');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//--END POINT ROUTING--//
app.use('/api', apiRouter);

//--ERROR HANDLING MIDDLEWARE--//
app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handleServerErrors)


module.exports=app
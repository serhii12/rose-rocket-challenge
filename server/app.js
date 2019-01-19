const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes/index');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/', routes);

module.exports = app;

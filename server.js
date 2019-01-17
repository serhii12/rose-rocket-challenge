const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes/index');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/', routes);

const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}`)
);

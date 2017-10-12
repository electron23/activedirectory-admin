var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var error = require('./routes/error');
var auth = require('./routes/auth');
var setup = require('./setup');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'client')));

app.use('/api', index);

app.use(error);

setup.now();

module.exports = app;

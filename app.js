// Load libraries into the environment application
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json({ type: 'application/json' }));

mongoose.connect('mongodb://localhost:27017', { dbName: 'dbBirds', useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB', error));

require('./models/mdlBirds');

var indexRouter = require('./routes/index');
var authorRouter = require('./routes/author');
var birdRouter = require('./routes/bird');
var commentRouter = require('./routes/comment');

app.use('/', indexRouter);
app.use('/author', authorRouter);
app.use('/bird', birdRouter);
app.use('/comment', commentRouter);

var server = app.listen(5005, () => {
    console.log(`Server is listening on port ${server.address().port}`);
});

module.exports = app;

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');

var app = express(),
    api = require('./routes/api'),
    dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/marquez-db';

mongoose.connect(dbURI);
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

module.exports = app;

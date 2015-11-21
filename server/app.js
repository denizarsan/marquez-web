var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var path = require('path');

var app = express(),
    api = require('./routes/api'),
    User = require('./models/user'),
    dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/marquez-db';

// Connect to the database
mongoose.connect(dbURI);

// Configure express
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'marquez', resave: true, saveUninitialized: false }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Register api routes
app.use('/api', api);

// Delegate everything else to the client
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

module.exports = app;

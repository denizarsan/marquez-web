var router = require('express').Router();
var passport = require('passport');

var Message = require('../models/message'),
    Performance = require('../models/performance'),
    Photo = require('../models/photo'),
    Recording = require('../models/recording'),
    User = require('../models/user');

// ------------------------------------------------------------
//                     Admin Endpoints
// ------------------------------------------------------------

// Middleware to require admin user credentials
router.use('/admin', function(req, res, next) {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.sendStatus(401);
    }
});

// Add a new user
router.post('/admin/user', function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function() {
        res.sendStatus(200);
    });
});

// Get all registered users
router.get('/admin/users', function(req, res) {
    User.find(function(err, users) {
        res.status(200).json({ users: users });
    });
});

// Add a new performance
router.post('/admin/performance', function(req, res) {
    var performance = new Performance();

    performance.id = req.body.id;
    performance.caption = req.body.caption;
    performance.isPrivate = req.body.isPrivate;

    performance.save(function () {
        res.sendStatus(200);
    });
});

// Get all performances
router.get('/admin/performances', function(req, res) {
    Performance.find(function(err, performances) {
        res.status(200).json({ performances: performances });
    });
});

// Add a new photo
router.post('/admin/photo', function(req, res) {
    var photo = new Photo();

    photo.url = req.body.url;
    photo.caption = req.body.caption;
    photo.isPrivate = req.body.isPrivate;

    photo.save(function () {
        res.sendStatus(200);
    });
});

// Get all photos
router.get('/admin/photos', function(req, res) {
    Photo.find(function(err, photos) {
        res.status(200).json({ photos: photos });
    });
});

// Add a new recording
router.post('/admin/recording', function(req, res) {
    var recording = new Recording();

    recording.url = req.body.url;
    recording.title = req.body.title;
    recording.caption = req.body.caption;
    recording.isPrivate = req.body.isPrivate;

    recording.save(function () {
        res.sendStatus(200);
    });
});

// Get all recordings
router.get('/admin/recordings', function(req, res) {
    Recording.find(function(err, recordings) {
        res.status(200).json({ recordings: recordings });
    });
});

// Get all sent messages
router.get('/admin/messages', function(req, res) {
    Message.find(function(err, messages) {
        res.status(200).json({ messages: messages });
    });
});

// ------------------------------------------------------------
//                  Privileged User Endpoints
// ------------------------------------------------------------

// Middleware to require privileged user credentials
router.use('/private', function(req, res, next) {
    if(req.user){
        next();
    } else {
        res.sendStatus(401);
    }
});

// Get private performances
router.get('/private/performances', function(req, res) {
    Performance.where('isPrivate', true).exec(function(err, performances) {
        res.status(200).json({ performances: performances });
    });
});

// Get private photos
router.get('/private/photos', function(req, res) {
    Photo.where('isPrivate', true).exec(function(err, photos) {
        res.status(200).json({ photos: photos });
    });
});

// Get private recordings
router.get('/private/recordings', function(req, res) {
    Recording.where('isPrivate', true).exec(function(err, recordings) {
        res.status(200).json({ recordings: recordings });
    });
});

// ------------------------------------------------------------
//                  Anonymous User Endpoints
// ------------------------------------------------------------

// Login to become admin or privileged user
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {

        if (!user) { return res.sendStatus(401); }

        req.logIn(user, function(err) {
            if (err) { return res.sendStatus(500); }
            var currentUser = {
                username: user.username,
                isAdmin: user.isAdmin
            };
            res.status(200).json({ user: currentUser});
        });
    })(req, res, next);
});

// Logout
router.get('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
});

// Send a message
router.post('/message', function(req, res) {
    var message = new Message();

    message.name = req.body.name;
    message.email = req.body.email;
    message.body = req.body.body;

    message.save(function () {
        res.sendStatus(200);
    });
});

// Get public performances
router.get('/performances', function(req, res) {
    Performance.where('isPrivate', false).exec(function(err, performances) {
        res.status(200).json({ performances: performances });
    });
});

// Get public photos
router.get('/photos', function(req, res) {
    Photo.where('isPrivate', false).exec(function(err, photos) {
        res.status(200).json({ photos: photos });
    });
});

// Get public recordings
router.get('/recordings', function(req, res) {
    Recording.where('isPrivate', false).exec(function(err, recordings) {
        res.status(200).json({ recordings: recordings });
    });
});

module.exports = router;

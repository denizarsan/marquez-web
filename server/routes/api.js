var passport = require('passport');
var router = require('express').Router();

var Message = require('../models/message'),
    Performance = require('../models/performance'),
    Photo = require('../models/photo'),
    Recording = require('../models/recording'),
    User = require('../models/user');

// ------------------------------------------------------------
//                       Admin Endpoints
// ------------------------------------------------------------

// Middleware to require admin user credentials
router.use('/admin', function(req, res, next) {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.sendStatus(401);
    }
});

// Delete a message
router.delete('/admin/message/:id', function(req, res, next) {
    Message.remove({ _id: req.params.id }, function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Get all sent messages
router.get('/admin/messages', function(req, res, next) {
    Message.find(function(err, messages) {
        if (err) { return next(err); }
        res.status(200).json({ messages: messages });
    });
});

// Add a new performance
router.post('/admin/performance', function(req, res, next) {
    var performance = new Performance();

    performance.id = req.body.id;
    performance.caption = req.body.caption;
    performance.isPrivate = req.body.isPrivate;

    performance.save(function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Delete a performance
router.delete('/admin/performance/:id', function(req, res, next) {
    Performance.remove({ _id: req.params.id }, function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Update a performance
router.put('/admin/performance/:id', function(req, res, next) {
    Performance.update({ _id: req.params.id }, req.body, function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Get all performances
router.get('/admin/performances', function(req, res, next) {
    Performance.find(function(err, performances) {
        if (err) { return next(err); }
        res.status(200).json({ performances: performances });
    });
});

// Add a new photo
router.post('/admin/photo', function(req, res, next) {
    var photo = new Photo();

    photo.url = req.body.url;
    photo.caption = req.body.caption;
    photo.isPrivate = req.body.isPrivate;

    photo.save(function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Delete a photo
router.delete('/admin/photo/:id', function(req, res, next) {
    Photo.remove({ _id: req.params.id }, function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Update a photo
router.put('/admin/photo/:id', function(req, res, next) {
    Photo.update({ _id: req.params.id }, req.body, function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Get all photos
router.get('/admin/photos', function(req, res, next) {
    Photo.find(function(err, photos) {
        if (err) { return next(err); }
        res.status(200).json({ photos: photos });
    });
});

// Add a new recording
router.post('/admin/recording', function(req, res, next) {
    var recording = new Recording();

    recording.url = req.body.url;
    recording.title = req.body.title;
    recording.caption = req.body.caption;
    recording.isPrivate = req.body.isPrivate;

    recording.save(function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Delete a recording
router.delete('/admin/recording/:id', function(req, res, next) {
    Recording.remove({ _id: req.params.id }, function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Update a recording
router.put('/admin/recording/:id', function(req, res, next) {
    Recording.update({ _id: req.params.id }, req.body, function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Get all recordings
router.get('/admin/recordings', function(req, res, next) {
    Recording.find(function(err, recordings) {
        if (err) { return next(err); }
        res.status(200).json({ recordings: recordings });
    });
});

// Add a new user
router.post('/admin/user', function(req, res, next) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Delete a user
router.delete('/admin/user/:id', function(req, res, next) {
    User.remove({ _id: req.params.id }, function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Get all registered users
router.get('/admin/users', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.status(200).json({ users: users });
    });
});

// ------------------------------------------------------------
//                      Private Endpoints
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
router.get('/private/performances', function(req, res, next) {
    Performance.where('isPrivate', true).exec(function(err, performances) {
        if (err) { return next(err); }
        res.status(200).json({ performances: performances });
    });
});

// Get private photos
router.get('/private/photos', function(req, res, next) {
    Photo.where('isPrivate', true).exec(function(err, photos) {
        if (err) { return next(err); }
        res.status(200).json({ photos: photos });
    });
});

// Get private recordings
router.get('/private/recordings', function(req, res, next) {
    Recording.where('isPrivate', true).exec(function(err, recordings) {
        if (err) { return next(err); }
        res.status(200).json({ recordings: recordings });
    });
});

// ------------------------------------------------------------
//                       Public Endpoints
// ------------------------------------------------------------

// Login to become admin or privileged user
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {

        if (err) { return next(err); }

        if (!user) { return next(info); }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
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
router.post('/message', function(req, res, next) {
    var message = new Message();

    message.name = req.body.name;
    message.email = req.body.email;
    message.body = req.body.body;

    message.save(function(err) {
        if (err) { return next(err); }
        res.sendStatus(200);
    });
});

// Get public performances
router.get('/performances', function(req, res, next) {
    Performance.where('isPrivate', false).exec(function(err, performances) {
        if (err) { return next(err); }
        res.status(200).json({ performances: performances });
    });
});

// Get public photos
router.get('/photos', function(req, res, next) {
    Photo.where('isPrivate', false).exec(function(err, photos) {
        if (err) { return next(err); }
        res.status(200).json({ photos: photos });
    });
});

// Get public recordings
router.get('/recordings', function(req, res, next) {
    Recording.where('isPrivate', false).exec(function(err, recordings) {
        if (err) { return next(err); }
        res.status(200).json({ recordings: recordings });
    });
});

// Middleware to handle all errors
router.use(function(err, req, res, next) {
    res.status(err.status || 500).json(err);
});

module.exports = router;

var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user'),
    Message = require('../models/message'),
    Performance = require('../models/performance'),
    Photo = require('../models/photo'),
    Recording = require('../models/recording');

router.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err) {
        if (err) {
            return res.status(500).json({err: err});
        }

        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({ status: 'Registration successful!' });
        });
    });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }

        if (!user) {
            return res.status(401).json({err: info});
        }

        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({err: 'Could not log in user'});
            }
            res.status(200).json({status: 'Login successful!'});
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({status: 'Bye!'});
});

router.get('/messages', function(req, res) {
    Message.find(function(err, messages) {
        res.send({ messages: messages });
    });
});

router.post('/message', function(req, res) {
    var message = new Message();

    message.name = req.body.name;
    message.email = req.body.email;
    message.body = req.body.body;

    message.save(function () {
        res.send(req.body);
    });
});

router.get('/performances', function(req, res) {
    Performance.find(function(err, performances) {
        res.send({ performances: performances });
    });
});

router.post('/performance', function(req, res) {
    var performance = new Performance();

    performance.id = req.body.id;
    performance.caption = req.body.caption;

    performance.save(function () {
        res.send(req.body);
    });
});

router.get('/photos', function(req, res) {
    Photo.find(function(err, photos) {
        res.send({ photos: photos });
    });
});

router.post('/photo', function(req, res) {
    var photo = new Photo();

    photo.url = req.body.url;
    photo.caption = req.body.caption;

    photo.save(function () {
        res.send(req.body);
    });
});

router.get('/recordings', function(req, res) {
    Recording.find(function(err, recordings) {
        res.send({ recordings: recordings });
    });
});

router.post('/recording', function(req, res) {
    var recording = new Recording();

    recording.url = req.body.url;
    recording.title = req.body.title;
    recording.caption = req.body.caption;

    recording.save(function () {
        res.send(req.body);
    });
});

module.exports = router;

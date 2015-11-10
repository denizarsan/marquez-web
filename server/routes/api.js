var express = require('express'),
    router = express.Router(),
    Performance = require('../models/performance'),
    Photo = require('../models/photo'),
    Recording = require('../models/recording');

router.get('/performances', function(req, res) {
    Performance.find(function (err, performances) {
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
    Photo.find(function (err, photos) {
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
    Recording.find(function (err, recordings) {
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

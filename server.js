var express = require('express');
var mongoose = require('mongoose');
var app = express();

var Images = require('./models/images'),
    Songs = require('./models/songs'),
    Videos = require('./models/videos');

var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/marquez-api';
mongoose.connect(dbURI);

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/build'));

// Add endpoints
app.get('/api/images', Images.getImages);
app.get('/api/songs', Songs.getSongs);
app.get('/api/videos', Videos.getVideos);
app.post('/api/images/add', Images.addImage);
app.post('/api/songs/add', Songs.addSong);
app.post('/api/videos/add', Videos.addVideo);

// Serve web client
app.get('*', function(req, res) {
  res.sendfile('./build/index.html');
});

app.listen(port);

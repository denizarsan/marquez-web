// Node Dependencies
var restify = require('restify'),
    mongoose = require('mongoose');

// Models
var Images = require('./models/images'),
    Songs = require('./models/songs'),
    Videos = require('./models/videos');

// Local Vars
var dbURI, server, port;

// Connect to the database
dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',
mongoose.connect(dbURI);

// Configure the server
port = process.env.PORT || 8080;
server = restify.createServer({ name: 'marquez-api' });
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

// Add endpoints
server.get('/images', Images.getImages);
server.get('/songs', Songs.getSongs);
server.get('/videos', Videos.getVideos);
server.post('/images/add', Images.addImage);
server.post('/songs/add', Songs.addSong);
server.post('/videos/add', Videos.addVideo);

// Start the server
server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});



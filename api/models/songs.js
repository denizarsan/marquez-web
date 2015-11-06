var mongoose = require('mongoose');

var SongSchema = mongoose.Schema({ url: String, title: String, caption: String }),
    SongModel = mongoose.model('songs', SongSchema);

exports.getSongs = function(req, res) {
    SongModel.find(function (err, songs) {
        res.send({ songs: songs });
    });
};

exports.addSong = function(req, res) {
    var song = new SongModel();

    song.url = req.params.url;
    song.title = req.params.title;
    song.caption = req.params.caption;

    song.save(function () {
        res.send(req.body);
    });
};

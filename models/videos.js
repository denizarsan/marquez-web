var mongoose = require('mongoose');

var VideoSchema = mongoose.Schema({ id: String, caption: String }),
    VideoModel = mongoose.model('videos', VideoSchema);

exports.getVideos = function(req, res) {
    VideoModel.find(function (err, videos) {
        res.send({ videos: videos });
    });
};

exports.addVideo = function(req, res) {
    var video = new VideoModel();

    video.id = req.params.id;
    video.caption = req.params.caption;

    video.save(function () {
        res.send(req.body);
    });
};

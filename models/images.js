var mongoose = require('mongoose');

var ImageSchema = mongoose.Schema({ url: String, caption: String }),
    ImageModel = mongoose.model('images', ImageSchema);

exports.getImages = function(req, res) {
    ImageModel.find(function (err, images) {
        res.send({ images: images });
    });
};

exports.addImage = function(req, res) {
    var image = new ImageModel();

    image.url = req.params.url;
    image.caption = req.params.caption;

    image.save(function () {
        res.send(req.body);
    });
};

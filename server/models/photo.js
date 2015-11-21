var mongoose = require('mongoose');

var Photo = new mongoose.Schema({
    url: String,
    caption: String,
    isPrivate: { type: Boolean, default: false }
});

module.exports = mongoose.model('photos', Photo);

var mongoose = require('mongoose');

var Recording = mongoose.Schema({
    url: String,
    title: String,
    caption: String,
    isPrivate: { type: Boolean, default: false }
});

module.exports = mongoose.model('recordings', Recording);

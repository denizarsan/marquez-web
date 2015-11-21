var mongoose = require('mongoose');

var Performance = new mongoose.Schema({
    id: String,
    caption: String,
    isPrivate: { type: Boolean, default: false }
});

module.exports = mongoose.model('performances', Performance);

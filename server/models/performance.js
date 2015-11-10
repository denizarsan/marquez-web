var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Performance = new Schema({
    id: String,
    caption: String
});

module.exports = mongoose.model('performances', Performance);

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Photo = new Schema({
    url: String,
    caption: String
});

module.exports = mongoose.model('photos', Photo);

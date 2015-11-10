var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Recording = new Schema({
    url: String,
    title: String,
    caption: String
});

module.exports = mongoose.model('recordings', Recording);

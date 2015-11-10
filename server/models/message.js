var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Message = new Schema({
    name: String,
    email: String,
    body: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('messages', Message);

var mongoose = require('mongoose');

var Message = new mongoose.Schema({
    name: String,
    email: String,
    body: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('messages', Message);

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
        username: String,
        password: String,
        isAdmin: { type: Boolean, default: false }
    });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);

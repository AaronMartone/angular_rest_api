// import core modules.
var mongoose = require('mongoose');

// define model schema.
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        last: {
            type: String,
            required: true
        },
        first: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    }
});

// export model.
module.exports = mongoose.model('User', userSchema);
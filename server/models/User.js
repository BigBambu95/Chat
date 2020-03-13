const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    chatId: {
        type: String   
    }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
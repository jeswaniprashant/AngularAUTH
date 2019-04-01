const mongoose = require('mongoose');
const mongodb = require('mongodb');
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

module.exports = mongoose.model('user', userSchema, 'users');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const eventSchema = new mongoose.Schema({
    name: String,
    description: String
})

module.exports = mongoose.model('event', eventSchema, 'events');
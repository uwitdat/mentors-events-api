const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    interests: [{
        type: String
    }],
    tags: [{
        type: String
    }]

})

module.exports = mongoose.model('Profile', profileSchema)
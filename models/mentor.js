const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    creds: {
        type: String,
        required: true
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Event',
            required: false
        },

    ]

})

module.exports = mongoose.model('Mentor', mentorSchema)
const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: 'http://zoom-meeting/123dsd1231.com'
    }

})

module.exports = mongoose.model('Event', eventSchema)
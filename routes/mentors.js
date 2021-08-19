const express = require('express')
const router = express.Router()
const Mentor = require('../models/profile')
const Event = require('../models/event')

//GET ALL
router.get('/', async (req, res) => {
    try {
        const mentors = await Mentor.find()
        res.json(mentors)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//CREATE ONE
router.post('/', async (req, res) => {
    const event = new Event({
        eventName: req.body.eventName,
        dateTime: req.body.dateTime,
    })
    const newEvent = await event.save()

    const mentor = new Mentor({
        name: req.body.name,
        avatar: req.name.body.avatar,
        creds: req.body.creds,
        events: newEvent._id
    })

    try {
        const newMentor = await mentor.save()
        res.status(201).json(newMentor)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

module.exports = router
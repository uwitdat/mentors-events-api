const express = require('express')
const router = express.Router()
const Mentor = require('../models/mentor')
const Event = require('../models/event')

//GET ALL
router.get('/', async (req, res) => {
    try {
        const mentors = await Mentor.find().populate('events')
        res.json(mentors)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const events = await Event.find({ mentorId: req.params.id })
        console.log('QUERY=>', req.params.id)
        res.json(events)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//CREATE ONE
router.post('/', async (req, res) => {

    const mentor = new Mentor({
        name: req.body.name,
        avatar: req.body.avatar,
        creds: req.body.creds,
    })

    let newMentor;
    try {

        for (const elm of req.body.events) {

            const event = new Event({
                eventName: elm.eventName,
                dateTime: elm.dateTime,
                mentorId: mentor._id
            })
            mentor.events = [...mentor.events, event]
            try {
                await event.save()

                newMentor = await mentor.save()

            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        }
        res.status(201).json(newMentor)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})



module.exports = router
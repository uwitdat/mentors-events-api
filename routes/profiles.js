const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')

//GET ALL
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find()
        res.json(profiles)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//GET ONE
router.get('/:id', getProfile, (req, res) => {
    res.send(res.profile)
})

//CREATE ONE
router.post('/', async (req, res) => {
    const profile = new Profile({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        avatar: req.body.avatar,
        interests: req.body.interests,
        tags: req.body.tags
    })

    try {
        const newProfile = await profile.save()
        res.status(201).json(newProfile)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

//UPDATE ONE
router.patch('/:id', async (req, res) => {
    profile = await Profile.findById(req.params.id)
    if (req.body.firstName != null) {
        profile.firstName = req.body.firstName
    }
    if (req.body.interests != null) {
        profile.interests = req.body.interests
    }
    try {
        const updatedProfile = await profile.save()
        res.json(updatedProfile)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

//DELETE ONE
router.delete('/:id', getProfile, async (req, res) => {
    try {
        await res.profile.remove()
        res.json({ message: 'Deleted Profile' })
    } catch (err) {
        res.status(500).json({ message: err.messagge })
    }
})

async function getProfile(req, res, next) {
    let profile;
    try {
        profile = await Profile.findById(req.params.id)
        if (profile == null) {
            return res.status(404).json({ message: 'Cannot find Profile' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.profile = profile
    next()
}

module.exports = router
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (err) => console.err(err))
db.once('open', () => console.log('Connected to DB'))

app.use(express.json())

const profilesRouter = require('./routes/profiles')

app.use('/profiles', profilesRouter)


app.listen(3001, () => console.log('server running'))
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require('../database/connection')
const cors = require('cors')
app.use(cors())
const route = require('../routes/router')
app.use('/Notes', route)

app.all('*', (req, res) => {
    res.status(404).send({ apiStatus: false, data: null, message: 'invalid url' })
})


module.exports = app
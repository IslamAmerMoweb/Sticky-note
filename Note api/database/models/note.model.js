const mongoose = require('mongoose')
const noteSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    },
    id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})
const noteModel = mongoose.model('savedNote', noteSchema)
module.exports = noteModel
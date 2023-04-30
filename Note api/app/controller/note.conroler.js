const noteModel = require('../../database/models/note.model')
const { help } = require('../helper')

class Note {
    static addNote = async (req, res) => {
        try {
            const note = await noteModel(req.body)
            await note.save()
            help(res, 200, 'success', note, 'note adedd successful')
        } catch (e) {
            help(res, 200, 'success', JSON.parse(JSON.stringify(e)), 'note not adedd error')
        }
    }

    static findNote = async (req, res) => {
        try {
            const note = await noteModel.find({ id: req.body.notes.id })
            help(res, 200, 'success', note, 'note saved')
        } catch (e) {
            help(res, 200, 'false', JSON.parse(JSON.stringify(e)), 'error in note')
        }
    }

    static delNote = async (req, res) => {
        try {
            const del = await noteModel.findByIdAndDelete(req.body.body)
            help(res, 200, 'success', '', 'note deleted')
        } catch (e) {
            help(res, 200, 'false', JSON.parse(JSON.stringify(e)), 'note not deleted')
        }
    }

    static updateNote = async (req, res) => {
        try {
            const update = await noteModel.findByIdAndUpdate(req.body.id, req.body.form)
            help(res, 200, 'success', update, 'note updated')
        } catch (e) {
            console.log(e);
            help(res, 200, 'false', JSON.parse(JSON.stringify(e)), 'note not updated')
        }
    }
}
module.exports = Note
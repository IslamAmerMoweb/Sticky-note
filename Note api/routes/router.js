const registerController = require('../app/controller/register.controller')
const noteControler = require('../app/controller/note.conroler')
const Router = require('express').Router()
const auth = require('../app/middleware/auth')
Router.post('/register', registerController.register)
Router.post('/login', registerController.login)

Router.post('/addNote', noteControler.addNote)
Router.post('/allNote', noteControler.findNote)
Router.delete('/delNote', noteControler.delNote)
Router.patch('/updateNote', noteControler.updateNote)
module.exports = Router
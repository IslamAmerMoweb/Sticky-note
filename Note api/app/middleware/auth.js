const jwt = require('jsonwebtoken')
const registerModel = require('../../database/models/register.model')
const { help } = require('../helper')
const auth = async (req, res, next) => {
    try {
        const token = req.header('token').replace('bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWTKEY)
        const userData = registerModel.findOne({
            _id: decodedToken._id,
            'tokens.token': token
        })
        if (!userData) throw new Error('unauthrized')
        req.user = userData
        req.token = token
        next()
    } catch (e) {
        help(res, 404, false, e, 'unauthrized')
    }
}

module.exports = auth
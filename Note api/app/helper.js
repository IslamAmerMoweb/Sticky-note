const http = require('http')
class Helper {
    static help = (res, statusCode, apiStatus, data, message) => {
        res.status(statusCode).send({ message, data, apiStatus })
    }
}

module.exports = Helper
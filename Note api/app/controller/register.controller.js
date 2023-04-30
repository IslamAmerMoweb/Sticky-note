const registerModel = require('../../database/models/register.model')
const { help } = require('../helper')
class UserRegister {
    static register = async (req, res, next) => {
        try {
            const user = await new registerModel(req.body)
            await user.save()
            if (user) {
                help(res, 200, 'success', user, 'adedd user')
            }
        }
        catch (e) {
            if (e.errors?.age) {
                help(res, 200, 'false', JSON.parse(JSON.stringify(e)), 'maximum age shoud be 90')
            }
            else if (e.keyValue.email) {
                help(res, 200, 'false', JSON.parse(JSON.stringify(e.keyValue.email)), 'email is already exist')
            }
            else if (e.keyValue.email && e.errors.age) {
                help(res, 200, 'false', JSON.parse(JSON.stringify(e)), 'invaild data age and email')
            }
            console.log(JSON.parse(JSON.stringify(e)));

        }
    }

    static login = async (req, res) => {
        try {
            const user = await registerModel.logIn(req.body.email, req.body.password)
            const token = await user.generateToken()
            help(res, 200, 'success', { token, user }, 'success login')
        } catch (e) {
            help(res, 200, 'false', {}, JSON.parse(JSON.stringify(e.message)))
        }
    }
}

module.exports = UserRegister
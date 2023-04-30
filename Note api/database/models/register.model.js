const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const registerSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('invalid Email')
        },
    },
    password: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        max: 90,
        min: 12,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

registerSchema.methods.toJSON = function () {
    const data = this.toObject()
    delete data.__v
    delete data.password
    delete data.rePassword
    delete data.phone
    delete data._id
    return data
}

registerSchema.pre('save', async function () {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 12)
})

registerSchema.statics.logIn = async (email, password, cb) => {
    const user = await registerModel.findOne({ email })
    if (!user) throw new Error('invalid email')
    const pass = await bcrypt.compare(password, user.password)
    if (!pass) throw new Error('invalid password')
    return user
}

registerSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTKEY)
    this.tokens = this.tokens.concat({ token })
    // await this.save()
    return token
}

const registerModel = mongoose.model('note', registerSchema)
module.exports = registerModel
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    email: { type: String, unqiue: true },
    firstName: String,
    lastName: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    address: String,
    role: String,
    background: String,
    contactLinks: [{ icon: String, url: String, title: String }],
    footerDescription: String,
    callToAction: {
        thumbnail: String,
        emphasized: String,
        description: String
    }
})

module.exports = model('User', userSchema)

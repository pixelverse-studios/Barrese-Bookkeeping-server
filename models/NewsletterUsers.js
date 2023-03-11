const { model, Schema } = require('mongoose')

const newsletterUsersSchema = new Schema({
    email: { type: String, unqiue: true },
    firstName: String,
    lastName: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    subscribed: Boolean
})

module.exports = model('NewsletterUsers', newsletterUsersSchema)

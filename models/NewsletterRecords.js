const { model, Schema } = require('mongoose')

const newsletterRecordsSchema = new Schema({
    participants: [
        {
            email: String,
            firstName: String,
            lastName: String
        }
    ],
    emailBody: [String],
    subjectLine: String,
    sentAt: { type: Date, default: Date.now }
})

module.exports = model('NewsletterRecords', newsletterRecordsSchema)

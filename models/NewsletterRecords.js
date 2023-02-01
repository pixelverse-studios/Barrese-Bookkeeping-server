const { model, Schema } = require('mongoose')

const newsletterRecordsSchema = new Schema({
    participants: [String],
    emailBody: [String],
    subjectLine: String,
    sentAt: { type: Date, default: Date.now }
})

module.exports = model('NewsletterRecords', newsletterRecordsSchema)

const { model, Schema } = require('mongoose')

const faqSchema = new Schema({
    question: String,
    answer: String
})

module.exports = model('FAQs', faqSchema)

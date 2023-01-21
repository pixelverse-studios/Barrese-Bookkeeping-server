const { model, Schema } = require('mongoose')

const servicesSchema = new Schema({
    pageH1: String,
    pageH2: String,
    description: String,
    offerings: [
        {
            icon: String,
            title: String,
            description: String,
            bullets: [String]
        }
    ]
})

module.exports = model('Services', servicesSchema)

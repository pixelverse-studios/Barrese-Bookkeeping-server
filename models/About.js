const { model, Schema } = require('mongoose')

const aboutSchema = new Schema({
    description: [String]
})

module.exports = model('About', aboutSchema)

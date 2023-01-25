const { model, Schema } = require('mongoose')

const cmsSchema = new Schema({
    callToAction: {
        image: String,
        heading: String,
        description: String
    },
    about: {
        profilePic: String,
        backgroundInfo: String,
        role: String,
        title: String
    },
    footer: {
        contactLinks: [{ icon: String, link: String, title: String }],
        description: String
    },
    services: {
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
    },
    faqs: [{ question: String, answer: String }],
    blog: [
        {
            thumbnail: String,
            image: String,
            title: String,
            recap: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
})

module.exports = model('CMS', cmsSchema)

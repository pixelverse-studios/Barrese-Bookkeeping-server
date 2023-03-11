const { model, Schema } = require('mongoose')

const cmsSchema = new Schema({
    callToAction: {
        image: String,
        heading: String,
        description: String,
        buttonLabel: String
    },
    about: {
        profilePic: String,
        backgroundInfo: String,
        role: String,
        title: String,
        header: String,
        subHeader: String,
        heroImage: String
    },
    footer: {
        contactLinks: [{ icon: String, link: String, title: String }]
    },
    services: {
        pageH1: String,
        pageH2: String,
        description: String,
        heroImage: String,
        offerings: [
            {
                icon: String,
                title: String,
                description: String,
                bullets: [String]
            }
        ]
    },
    faqs: {
        pageH1: String,
        pageH2: String,
        heroImage: String,
        qAndA: [{ question: String, answer: String }]
    },
    blog: {
        pageH1: String,
        pageH2: String,
        heroImage: String,
        blogs: [
            {
                thumbnail: String,
                image: String,
                title: String,
                recap: String,
                content: [String],
                createdAt: { type: Date, default: Date.now }
            }
        ]
    },
    landing: {
        heroImage: String,
        heroBannerH1: String,
        heroBannerH2: String,
        subtext: String
    }
})

module.exports = model('CMS', cmsSchema)

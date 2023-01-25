const CMS = require('../../models/CMS')
const { isTokenExpired, validateToken } = require('../../utils/token')
const buildResponse = require('../../utils/responseHandlers')

module.exports.CmsMutations = {
    async createCmsContent(
        _,
        { callToAction, about, footer, services, faqs, blog }
    ) {
        try {
            const newContent = new CMS({
                callToAction,
                about,
                footer,
                services,
                faqs,
                blog
            })
            const savedContent = await newContent.save()
            console.log(savedContent)

            return buildResponse.cms.success.edited(savedContent)
        } catch (error) {
            throw error
        }
    }
}

module.exports.CmsQueries = {
    async getAllCmsContent() {
        try {
            const content = await CMS.find()

            return buildResponse.cms.success.contentFetched(content[0])
        } catch (error) {
            throw error
        }
    }
}

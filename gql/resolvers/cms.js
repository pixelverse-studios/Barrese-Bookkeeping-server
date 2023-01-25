const CMS = require('../../models/CMS')
const { isTokenExpired, validateToken } = require('../../utils/token')
const buildResponse = require('../../utils/responseHandlers')

const ctaFields = 'Image, Heading, Description'

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

            return buildResponse.cms.success.edited(savedContent)
        } catch (error) {
            throw error
        }
    },
    async editCallToAction(
        _,
        { input: { heading, image, description }, cmsId },
        context
    ) {
        try {
            const token = validateToken(context)
            if (!token.valid) {
                return buildResponse.user.errors.invalidToken()
            }

            if (!image && !heading && !description) {
                return buildResponse.cms.errors.noValidFieldsReceived(
                    ctaFields,
                    'Call To Action'
                )
            }

            const cms = await CMS.findById({ _id: cmsId })
            if (cms == null) {
                return buildResponse.cms.errors.cmsItemNotFound('CMS Content')
            }

            cms.callToAction.image = image ? image : cms.callToAction.image
            cms.callToAction.heading = heading
                ? heading
                : cms.callToAction.heading
            cms.callToAction.description = description
                ? description
                : cms.callToAction.description

            const updated = await cms.save()

            return buildResponse.cms.success.edited(updated)
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

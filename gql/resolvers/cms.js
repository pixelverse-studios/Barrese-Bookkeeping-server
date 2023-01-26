const CMS = require('../../models/CMS')
const { isTokenExpired, validateToken } = require('../../utils/token')
const buildResponse = require('../../utils/responseHandlers')

const ctaFields = 'Image, Heading, Description'
const aboutFields = 'Profile Picture, Background Info, Role, Title'

const getCms = async _id => {
    try {
        const cms = await CMS.findById({ _id })
        if (cms == null) {
            return buildResponse.cms.errors.cmsItemNotFound('CMS Content')
        }

        return cms
    } catch (error) {
        throw error
    }
}

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
    async editCallToAction(_, { input, cmsID }, context) {
        try {
            const token = validateToken(context)
            if (!token.valid) {
                return buildResponse.user.errors.invalidToken()
            }

            if (Object.values(input).every(val => !val)) {
                return buildResponse.cms.errors.noValidFieldsReceived(
                    ctaFields,
                    'Call To Action'
                )
            }

            const cms = await getCms(cmsID)

            for (const [key, value] of Object.entries(input)) {
                cms.callToAction[key] = value ? value : cms.callToAction[key]
            }

            const updated = await cms.save()
            return buildResponse.cms.success.edited(updated)
        } catch (error) {
            throw error
        }
    },
    async editAbout(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        if (Object.values(input).every(value => !value)) {
            return buildResponse.cms.errors.noValidFieldsReceived(
                aboutFields,
                'About'
            )
        }

        const cms = await getCms(cmsID)
        for (const [key, value] of Object.entries(input)) {
            cms.about[key] = value ? value : cms.about[key]
        }

        const updated = await cms.save()
        return buildResponse.cms.success.edited(updated)
    },
    async editFooter() {},
    async editServiceContent() {},
    async createServiceOffering() {},
    async editServiceOffering() {},
    async deleteServiceOffering() {},
    async createFaq() {},
    async editFaq() {},
    async deleteFaq() {},
    async createBlog() {},
    async deleteBlog() {}
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

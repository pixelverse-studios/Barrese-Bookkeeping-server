const CMS = require('../../models/CMS')
const { validateToken } = require('../../utils/token')
const buildResponse = require('../../utils/responseHandlers')

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

            const isValid = Object.values(input).every(val => val)
            if (!isValid) {
                return buildResponse.cms.errors.noValidFieldsReceived(
                    'Image, Heading, Description',
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

        const isValid = Object.values(input).every(value => value)
        if (!isValid) {
            return buildResponse.cms.errors.noValidFieldsReceived(
                'Profile Picture, Background Info, Role, Title',
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
    async editFooter(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = input.contactLinks?.length && input.description != null
        if (!isValid) {
            return buildResponse.cms.errors.noValidFieldsReceived(
                'Contact Links, Description',
                'Footer'
            )
        }

        const cms = await getCms(cmsID)
        for (const [key, value] of Object.entries(input)) {
            cms.footer[key] = value ? value : cms.footer[key]
        }

        const updated = await cms.save()
        return buildResponse.cms.success.edited(updated)
    },
    async editServiceContent(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.values(input).every(value => !value)
        if (!isValid) {
            return buildResponse.cms.errors.noValidFieldsReceived(
                'Primary Page Header, Secondary Page Header, Description',
                'Services Info'
            )
        }

        const cms = await getCms(cmsID)
        for (const [key, value] of Object.entries(input)) {
            cms.services[key] = value ? value : cms.services[key]
        }

        const updated = await cms.save()
        return buildResponse.cms.success.edited(updated)
    },
    async createServiceOffering(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.entries(input).every(([key, value]) => {
            if (key === 'bullets') {
                return value?.length > 0 && value.every(item => item)
            } else {
                return !!value
            }
        })
        if (!isValid) {
            return buildResponse.cms.errors.noValidFieldsReceived(
                'Icon, Title, Description, Bullet Points',
                'Services Offering'
            )
        }

        const cms = await getCms(cmsID)
        cms.services.offerings.push(input)

        const updated = await cms.save()
        return buildResponse.cms.success.edited(updated)
    },
    async editServiceOffering(_, { input, offeringID, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }
        const isValid = Object.entries(input).some(([key, value]) => {
            if (key === 'bullets') {
                return value?.length > 0 && value.every(item => item)
            } else {
                return !!value
            }
        })
        if (!isValid) {
            return buildResponse.cms.errors.noValidFieldsReceived(
                'Icon, Title, Description, Bullet Points',
                'Services Offering'
            )
        }

        const cms = await getCms(cmsID)
        cms.services.offerings.id(offeringID).icon = !!input.icon
            ? input.icon
            : cms.services.offerings.id(offeringID).title
        cms.services.offerings.id(offeringID).title = !!input.title
            ? input.title
            : cms.services.offerings.id(offeringID).title
        cms.services.offerings.id(offeringID).description = !!input.description
            ? input.description
            : cms.services.offerings.id(offeringID).description
        cms.services.offerings.id(offeringID).bullets = !!input.bullets
            ? input.bullets.filter(bullet => bullet)
            : cms.services.offerings.id(offeringID).bullets

        const updated = await cms.save()
        return buildResponse.cms.success.edited(updated)
    },
    async deleteServiceOffering(_, { offeringID, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const cms = await getCms(cmsID)
        delete cms.services.offerings.id(offeringID)
        const updated = await cms.save()
        return buildResponse.cms.success.edited(updated)
    },
    async createFaq() {},
    async editFaq() {},
    async deleteFaq() {},
    async createBlog() {},
    async editBlog() {},
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

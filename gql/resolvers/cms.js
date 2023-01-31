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

            const isValid = Object.values(input).some(val => val)
            if (!isValid) {
                return buildResponse.cms.errors.minimumValidFieldsMissing(
                    'Image, Heading, Description, Button Label',
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
    async editLanding(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.values(input).some(value => value)
        if (!isValid) {
            return buildResponse.cms.errors.minimumValidFieldsMissing(
                'Hero Image, Banner, Secondary Banner,Subtext',
                'Landing'
            )
        }

        try {
            const cms = await getCms(cmsID)
            for (const [key, value] of Object.entries(input)) {
                cms.landing[key] = value ? value : cms.landing[key]
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

        const isValid = Object.values(input).some(value => value)
        if (!isValid) {
            return buildResponse.cms.errors.minimumValidFieldsMissing(
                'Profile Picture, Background Info, Role, Title, Hero Image',
                'About'
            )
        }

        try {
            const cms = await getCms(cmsID)
            for (const [key, value] of Object.entries(input)) {
                cms.about[key] = value ? value : cms.about[key]
            }

            const updated = await cms.save()
            return buildResponse.cms.success.edited(updated)
        } catch (error) {
            throw error
        }
    },
    async editFooter(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = input.contactLinks?.length
        if (!isValid) {
            return buildResponse.cms.errors.minimumValidFieldsMissing(
                'Contact Links',
                'Footer'
            )
        }

        try {
            const cms = await getCms(cmsID)
            cms.footer.contactLinks = input.contactLinks

            const updated = await cms.save()
            return buildResponse.cms.success.edited(updated)
        } catch (error) {
            throw error
        }
    },
    async editServiceContent(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.values(input).some(value => !value)
        if (!isValid) {
            return buildResponse.cms.errors.minimumValidFieldsMissing(
                'Primary Page Header, Secondary Page Header, Description, Hero Image',
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
            return buildResponse.cms.errors.minimumValidFieldsMissing(
                'Icon, Title, Description, Bullet Points',
                'Services Offering'
            )
        }

        try {
            const cms = await getCms(cmsID)
            cms.services.offerings.push(input)

            const updated = await cms.save()
            return buildResponse.cms.success.edited(updated)
        } catch (error) {
            throw error
        }
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
            return buildResponse.cms.errors.minimumValidFieldsMissing(
                'Icon, Title, Description, Bullet Points',
                'Services Offering'
            )
        }

        try {
            const cms = await getCms(cmsID)
            cms.services.offerings.id(offeringID).icon = !!input.icon
                ? input.icon
                : cms.services.offerings.id(offeringID).title
            cms.services.offerings.id(offeringID).title = !!input.title
                ? input.title
                : cms.services.offerings.id(offeringID).title
            cms.services.offerings.id(offeringID).description =
                !!input.description
                    ? input.description
                    : cms.services.offerings.id(offeringID).description
            cms.services.offerings.id(offeringID).bullets = !!input.bullets
                ? input.bullets.filter(bullet => bullet)
                : cms.services.offerings.id(offeringID).bullets

            const updated = await cms.save()
            return buildResponse.cms.success.edited(updated)
        } catch (error) {
            throw error
        }
    },
    async deleteServiceOffering(_, { offeringID, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        try {
            const cms = await getCms(cmsID)
            const offeringToDelete = cms.services.offerings.id(offeringID)

            if (!offeringToDelete) {
                return buildResponse.cms.errors.cmsItemNotFound(
                    'That Service Offering was'
                )
            }

            offeringToDelete.remove()
            const updated = await cms.save()
            return buildResponse.cms.success.edited(updated)
        } catch (error) {
            throw error
        }
    },
    async createFaqItem(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = !!input.question && !!input.answer
        if (!isValid) {
            return buildResponse.cms.errors.allValidFieldsMissing(
                'Question, Answer',
                'Creating FAQ item'
            )
        }

        try {
            const cms = await getCms(cmsID)
            cms.faqs.qAndA.push(input)
            const updated = await cms.save()
            return buildResponse.cms.success.edited(updated)
        } catch (error) {
            throw error
        }
    },
    async editFaqItem(_, { input, faqID, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = !!input.question || !!input.answer
        if (!isValid) {
            return buildResponse.cms.errors.minimumValidFieldsMissing(
                'Question, Answer',
                'Editing FAQ Item'
            )
        }

        const cms = await getCms(cmsID)
        const faqToEdit = cms.faqs.qAndA.id(faqID)
        faqToEdit.question = input.question
            ? input.question
            : faqToEdit.question
        faqToEdit.answer = input.answer ? input.answer : faqToEdit.answer

        const updated = await cms.save()
        return buildResponse.cms.success.edited(updated)
    },
    async deleteFaqItem(_, { faqID, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        try {
            const cms = await getCms(cmsID)
            const faqToDelete = cms.faqs.qAndA.id(faqID)

            if (!faqToDelete) {
                return buildResponse.cms.errors.cmsItemNotFound(
                    'That FAQ item was'
                )
            }

            faqToDelete.remove()
            const updated = await cms.save()
            return buildResponse.cms.success.edited(updated)
        } catch (error) {
            throw error
        }
    },
    async editFaqContent(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.values(input).some(value => value)
        if (!isValid) {
            return buildResponse.cms.errors.minimumValidFieldsMissing(
                'Hero Image, Page Primary Header, Page Secondary Header',
                'FAQ Content'
            )
        }

        try {
            const cms = await getCms(cmsID)
            for (const [key, value] of Object.entries(input)) {
                cms.faqs[key] = value ? value : cms.faqs[key]
            }

            const updated = await cms.save()
            return buildResponse.cms.success.edited(updated)
        } catch (error) {
            throw error
        }
    },
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

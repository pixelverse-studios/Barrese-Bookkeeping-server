const CMS = require('../../models/CMS')
const { validateToken } = require('../../utils/token')
const buildResponse = require('../../utils/responseHandlers')
const { getAllParticipants } = require('./newsletter/users')
const { getAllNewsletterRecords } = require('./newsletter/records')

const buildCmsResponse = async cms => {
    const updatedCms = { ...cms }

    const routePrefix = '/dashboard'
    const dashboardRoutes = [
        { label: 'User Profile', route: `${routePrefix}` },
        { label: 'Landing Page', route: `${routePrefix}/landing` },
        {
            label: 'Call To Action',
            route: `${routePrefix}/calltoaction`
        },
        { label: 'About Page', route: `${routePrefix}/about` },
        { label: 'Footer', route: `${routePrefix}/footer` },
        { label: 'Services Page', route: `${routePrefix}/services` },
        { label: 'FAQs Page', route: `${routePrefix}/faqs` },
        {
            label: 'Newsletter Users',
            route: `${routePrefix}/newsletter-users`
        },
        {
            label: 'Newsletter Records',
            route: `${routePrefix}/newsletter-records`
        }
    ]

    const users = await getAllParticipants()
    const records = await getAllNewsletterRecords()

    updatedCms._doc.dashboard = dashboardRoutes
    updatedCms._doc.newsletter = { users, records }

    return updatedCms
}

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
                return buildResponse.input.errors.someFieldsRequired(
                    'Image, Heading, Description, Button Label',
                    'Call To Action'
                )
            }

            const cms = await getCms(cmsID)

            for (const [key, value] of Object.entries(input)) {
                cms.callToAction[key] = value
            }

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
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
            return buildResponse.input.errors.someFieldsRequired(
                'Hero Image, Banner, Secondary Banner,Subtext',
                'Landing'
            )
        }

        try {
            const cms = await getCms(cmsID)
            for (const [key, value] of Object.entries(input)) {
                cms.landing[key] = value
            }

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
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
            return buildResponse.input.errors.someFieldsRequired(
                'Profile Picture, Background Info, Role, Title, Hero Image',
                'About'
            )
        }

        try {
            const cms = await getCms(cmsID)
            for (const [key, value] of Object.entries(input)) {
                cms.about[key] = value
            }

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
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
            return buildResponse.input.errors.someFieldsRequired(
                'Contact Links',
                'Footer'
            )
        }

        try {
            const cms = await getCms(cmsID)
            cms.footer.contactLinks = input.contactLinks

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
        } catch (error) {
            throw error
        }
    },
    async editServiceContent(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.values(input).some(value => value)
        if (!isValid) {
            return buildResponse.input.errors.someFieldsRequired(
                'Primary Page Header, Secondary Page Header, Description, Hero Image',
                'Services Info'
            )
        }

        const cms = await getCms(cmsID)
        for (const [key, value] of Object.entries(input)) {
            cms.services[key] = value
        }

        const updated = await cms.save()
        const cmsData = await buildCmsResponse(updated)
        return buildResponse.cms.success.edited(cmsData)
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
            return buildResponse.input.errors.someFieldsRequired(
                'Icon, Title, Description, Bullet Points',
                'Services Offering'
            )
        }

        try {
            const cms = await getCms(cmsID)
            cms.services.offerings.push(input)

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
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
            return buildResponse.input.errors.someFieldsRequired(
                'Icon, Title, Description, Bullet Points',
                'Services Offering'
            )
        }

        try {
            const cms = await getCms(cmsID)
            cms.services.offerings.id(offeringID).icon = input.icon
            cms.services.offerings.id(offeringID).title = input.title
            cms.services.offerings.id(offeringID).description =
                input.description
            cms.services.offerings.id(offeringID).bullets = input.bullets
            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
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
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
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
            return buildResponse.input.errors.allFieldsRequired(
                'Question, Answer',
                'Creating FAQ item'
            )
        }

        try {
            const cms = await getCms(cmsID)
            cms.faqs.qAndA.push(input)
            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
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
            return buildResponse.input.errors.someFieldsRequired(
                'Question, Answer',
                'Editing FAQ Item'
            )
        }

        try {
            const cms = await getCms(cmsID)
            const faqToEdit = cms.faqs.qAndA.id(faqID)
            faqToEdit.question = input.question
            faqToEdit.answer = input.answer

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
        } catch (error) {
            throw error
        }
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
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
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
            return buildResponse.input.errors.someFieldsRequired(
                'Hero Image, Page Primary Header, Page Secondary Header',
                'FAQ Content'
            )
        }

        try {
            const cms = await getCms(cmsID)
            for (const [key, value] of Object.entries(input)) {
                cms.faqs[key] = value
            }

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
        } catch (error) {
            throw error
        }
    },
    async createBlogItem(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.entries(input).every(([key, value]) => {
            if (key === 'content') {
                return value?.length > 0 && value.every(item => item)
            } else {
                return !!value
            }
        })
        if (!isValid) {
            return buildResponse.input.errors.allFieldsRequired(
                'Thumbnail, Image, Title, Recap, Content',
                'Creating a new Blog'
            )
        }

        try {
            const cms = await getCms(cmsID)
            cms.blog.blogs.push(input)

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
        } catch (error) {
            throw error
        }
    },
    async editBlogItem(_, { input, cmsID, blogID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.entries(input).some(([key, value]) => {
            if (key === 'content') {
                return value?.length > 0 && value.every(item => item)
            } else {
                return !!value
            }
        })
        if (!isValid) {
            return buildResponse.input.errors.someFieldsRequired(
                'Thumbnail, Image, Title, Recap, Content',
                'Editing a Blog'
            )
        }

        try {
            const cms = await getCms(cmsID)
            const blogToEdit = cms.blog.blogs.id(blogID)
            Object.entries(input).forEach(
                ([key]) => (blogToEdit[key] = input[key])
            )

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
        } catch (error) {
            throw error
        }
    },
    async deleteBlogItem(_, { cmsID, blogID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        try {
            const cms = await getCms(cmsID)
            const blogToDelete = cms.blog.blogs.id(blogID)

            if (!blogToDelete) {
                return buildResponse.cms.errors.cmsItemNotFound('That Blog was')
            }

            blogToDelete.remove()
            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
        } catch (error) {
            throw error
        }
    },
    async editBlogContent(_, { input, cmsID }, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.values(input).some(value => value)
        if (!isValid) {
            return buildResponse.input.errors.someFieldsRequired(
                'Hero Image, Page Primary Header, Page Secondary Header',
                'editing Blog Content'
            )
        }

        try {
            const cms = await getCms(cmsID)
            for (const [key, value] of Object.entries(input)) {
                cms.blog[key] = value
            }

            const updated = await cms.save()
            const cmsData = await buildCmsResponse(updated)
            return buildResponse.cms.success.edited(cmsData)
        } catch (error) {
            throw error
        }
    }
}

module.exports.CmsQueries = {
    async getAllCmsContent() {
        try {
            const content = await CMS.find()
            const cmsData = await buildCmsResponse(content[0])
            return buildResponse.cms.success.contentFetched(cmsData)
        } catch (error) {
            throw error
        }
    }
}

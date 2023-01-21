const FAQs = require('../../models/FAQs')
const { isTokenExpired, validateToken } = require('../../utils/token')
const buildResponse = require('../../utils/responseHandlers')

const SINLGE_RESPONSE = 'FAQsSuccess'
const MULTI_RESPONSE = 'MultiFAQsSuccess'
const MULTI_KEY = 'faqs'

module.exports.FAQsMutations = {
    async createFAQItem(_, { question, answer }, context) {
        const token = validateToken(context)
        if (!token || !isTokenExpired(token.exp)) {
            return buildResponse.user.errors.invalidToken()
        }

        try {
            const newFAQ = new FAQs({ question, answer })
            await newFAQ.save()

            const allFAQs = await FAQs.find()
            return buildResponse.cms.success.cmsUpdated(
                allFAQs,
                MULTI_RESPONSE,
                MULTI_KEY
            )
        } catch (error) {
            throw error
        }
    },
    async editFAQItem(_, { _id, question, answer }, context) {
        const token = validateToken(context)
        if (!token || !isTokenExpired(token.exp)) {
            return buildResponse.user.errors.invalidToken()
        }

        await FAQs.findByIdAndUpdate(_id, {
            question,
            answer
        })

        const updatedFAQs = await FAQs.find()

        return buildResponse.cms.success.cmsUpdated(
            updatedFAQs,
            MULTI_RESPONSE,
            MULTI_KEY
        )
    },
    async deleteFAQItem(_, { _id }, context) {
        const token = validateToken(context)
        if (!token || !isTokenExpired(token.exp)) {
            return buildResponse.user.errors.invalidToken()
        }

        await FAQs.findByIdAndDelete({ _id })
        const faqItems = await FAQs.find()
        if (!faqItems?.length) {
            return buildResponse.cms.errors.cmsItemNotFound('FAQ items were')
        }

        return buildResponse.cms.success.cmsItemFetched(
            faqItems,
            MULTI_RESPONSE,
            MULTI_KEY
        )
    }
}
module.exports.FAQsQueries = {
    async getFAQs(_, {}, context) {
        try {
            const token = validateToken(context)
            if (!token.valid) return buildResponse.user.errors.invalidToken()

            const faqItems = await FAQs.find()
            if (!faqItems?.length) {
                return buildResponse.cms.errors.cmsItemNotFound(
                    'FAQ items were'
                )
            }

            return buildResponse.cms.success.cmsItemFetched(
                faqItems,
                MULTI_RESPONSE,
                MULTI_KEY
            )
        } catch (error) {
            throw new Error(error)
        }
    }
}

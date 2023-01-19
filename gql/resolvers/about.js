const About = require('../../models/About')
const { isTokenExpired, validateToken } = require('../../utils/token')
const buildResponse = require('../../utils/responseHandlers')

const SINLGE_RESPONSE = 'AboutSuccess'

module.exports.AboutMutations = {
    async createAboutItem(_, { description }, context) {
        const token = validateToken(context)
        if (!token || !isTokenExpired(token.exp)) {
            return buildResponse.user.errors.invalidToken()
        }

        try {
            const newAbout = new About({ description })
            const saved = await newAbout.save()

            return buildResponse.cms.success.cmsUpdated(saved, 'AboutSuccess')
        } catch (error) {
            throw new Error(error)
        }
    },
    async editAboutItem(_, { _id, updated }, context) {
        const token = validateToken(context)
        if (!token || !isTokenExpired(token.exp)) {
            return buildResponse.user.errors.invalidToken()
        }

        const updatedItem = await About.findByIdAndUpdate(
            _id,
            {
                description: updated
            },
            { new: true }
        )

        return buildResponse.cms.success.cmsUpdated(
            updatedItem,
            SINLGE_RESPONSE
        )
    }
}

module.exports.AboutQueries = {
    async getAboutItems(_, {}, context) {
        try {
            const token = validateToken(context)
            if (!token.valid) return buildResponse.user.errors.invalidToken()

            const aboutItems = await About.find()
            if (!aboutItems?.length) {
                return buildResponse.cms.errors.cmsItemNotFound(
                    'About items were'
                )
            }

            return buildResponse.cms.success.cmsItemFetched(
                aboutItems[0],
                SINLGE_RESPONSE
            )
        } catch (error) {
            throw new Error(error)
        }
    }
}

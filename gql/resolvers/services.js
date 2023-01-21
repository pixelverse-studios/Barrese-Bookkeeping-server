const Services = require('../../models/Services')
const { isTokenExpired, validateToken } = require('../../utils/token')
const buildResponse = require('../../utils/responseHandlers')

const SINLGE_RESPONSE = 'ServicesSuccess'

module.exports.ServicesMutations = {
    async editServices(_, data, context) {
        const token = validateToken(context)
        if (!token || !isTokenExpired(token.exp)) {
            return buildResponse.user.errors.invalidToken()
        }

        try {
            const serviceData = await Services.findById({ _id: data._id })

            for (const [key, value] of Object.entries(data)) {
                if (key !== '_id' && value) {
                    serviceData[key] = value
                }
            }

            const saved = await serviceData.save()

            return buildResponse.cms.success.cmsUpdated(saved, SINLGE_RESPONSE)
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports.ServicesQueries = {
    async getServices(_, {}, context) {
        try {
            const token = validateToken(context)
            if (!token.valid) return buildResponse.user.errors.invalidToken()

            const serviceOfferings = await Services.find()
            if (!serviceOfferings?.length) {
                return buildResponse.cms.errors.cmsItemNotFound('Services were')
            }

            return buildResponse.cms.success.cmsItemFetched(
                serviceOfferings[0],
                SINLGE_RESPONSE
            )
        } catch (error) {
            throw new Error(error)
        }
    }
}

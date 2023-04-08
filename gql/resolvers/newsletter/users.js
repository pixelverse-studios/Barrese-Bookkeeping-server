const NewsletterUsers = require('../../../models/NewsletterUsers')
const { validateToken } = require('../../../utils/token')
const buildResponse = require('../../../utils/responseHandlers')

const getAllParticipants = async () => {
    try {
        return await NewsletterUsers.find()
    } catch (error) {
        throw error
    }
}

const getSubscribedParticipants = async () => {
    try {
        return await NewsletterUsers.find({
            subscribed: true
        })
    } catch (error) {
        throw error
    }
}

module.exports.getSubscribedParticipants = getSubscribedParticipants
module.exports.getAllParticipants = getAllParticipants
module.exports.NewsletterUserMutations = {
    async addUserToNewsletter(_, input, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }

        const isValid = Object.values(input).every(value => !!value)
        if (!isValid)
            return buildResponse.input.errors.allFieldsRequired(
                'Email, First Name, Last Name',
                'Adding User to Newsletter'
            )

        try {
            const userExists = await NewsletterUsers.findOne({
                email: input.email
            })

            if (userExists)
                return buildResponse.newsletter.errors.userExistsInNewsletter()

            const subscriber = new NewsletterUsers({
                ...input,
                updatedAt: Date.now(),
                subscribed: true
            })

            const saved = await subscriber.save()
            return buildResponse.newsletter.success.userAdded(saved)
        } catch (error) {
            throw error
        }
    },
    async updateSubscriptionStatus(_, input, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }
        try {
            const user = await NewsletterUsers.findOne({
                email: input.email
            })

            if (!user)
                return buildResponse.newsletter.errors.userNotInNewsletter()

            user.subscribed = input.subscribed
            user.updatedAt = Date.now()

            const saved = await user.save()
            console.log('saved: ', saved)
            return buildResponse.newsletter.success.statusUpdated(saved)
        } catch (error) {
            throw error
        }
    }
}
module.exports.NewsletterUserQueries = {
    async getSubscribedUsers(_, {}, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }
        try {
            const subscribedUsers = await getSubscribedParticipants()
            return buildResponse.newsletter.success.usersFetched(
                subscribedUsers
            )
        } catch (error) {
            throw error
        }
    },
    async getAllNewsletterUsers(_, {}, context) {
        const token = validateToken(context)
        if (!token.valid) {
            return buildResponse.user.errors.invalidToken()
        }
        try {
            const allUsers = await getAllParticipants()
            return buildResponse.newsletter.success.usersFetched(allUsers)
        } catch (error) {
            throw error
        }
    }
}

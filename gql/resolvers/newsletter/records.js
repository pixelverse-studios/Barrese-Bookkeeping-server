const NewsletterRecords = require('../../../models/NewsletterRecords')
const { validateToken } = require('../../../utils/token')
const buildResponse = require('../../../utils/responseHandlers')
const { getSubscribedParticipants } = require('./users')
const { sendGeneralNewsletter } = require('../../../utils/mailer/newsletter')

const getAllNewsletterRecords = async () => {
    try {
        return await NewsletterRecords.find()
    } catch (error) {
        throw error
    }
}

module.exports.getAllNewsletterRecords = getAllNewsletterRecords
module.exports.NewsletterRecordsMutations = {
    async dispatchNewsletter(_, { emailBody, subjectLine }, context) {
        try {
            const token = validateToken(context)
            if (!token.valid) {
                return buildResponse.user.errors.invalidToken()
            }

            if (!emailBody || !subjectLine)
                return buildResponse.input.errors.allFieldsRequired(
                    'Email Body, Subject Line',
                    'Sending a newsletter'
                )

            const participants = await getSubscribedParticipants()
            await sendGeneralNewsletter(emailBody, subjectLine, participants)

            const newRecord = new NewsletterRecords({
                participants,
                emailBody,
                subjectLine
            })

            const saved = await newRecord.save()

            return buildResponse.newsletter.success.newsletterSent(saved)
        } catch (error) {
            throw error
        }
    }
}
module.exports.NewsletterRecordsQueries = {
    async getAllNewsletterRecords() {
        try {
            const allRecords = await getAllNewsletterRecords()
            if (!allRecords.length) {
                return buildResponse.newsletter.errors.noDataFound(
                    'Newsletter Records'
                )
            }

            return buildResponse.newsletter.success.usersFetched(allUsers)
        } catch (error) {
            throw error
        }
    }
}

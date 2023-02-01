const { UserQueries, UserMutations } = require('./users')
const { CmsQueries, CmsMutations } = require('./cms')
const {
    NewsletterUserQueries,
    NewsletterUserMutations
} = require('./newsletter/users')
const {
    NewsletterRecordsMutations,
    NewsletterRecordsQueries
} = require('./newsletter/users')

const Query = {
    ...UserQueries,
    ...CmsQueries,
    ...NewsletterUserQueries,
    ...NewsletterRecordsQueries
}
const Mutation = {
    ...UserMutations,
    ...CmsMutations,
    ...NewsletterUserMutations,
    ...NewsletterRecordsMutations
}
module.exports = { Query, Mutation }

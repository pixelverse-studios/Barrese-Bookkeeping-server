const { UserQueries, UserMutations } = require('./users')
const { CmsQueries, CmsMutations } = require('./cms')

const Query = {
    ...UserQueries,
    ...CmsQueries
}
const Mutation = {
    ...UserMutations,
    ...CmsMutations
}
module.exports = { Query, Mutation }

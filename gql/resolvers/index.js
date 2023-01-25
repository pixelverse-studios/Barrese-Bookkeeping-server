const { UserQueries, UserMutations } = require('./users')
const { AboutQueries, AboutMutations } = require('./about')
const { ServicesQueries, ServicesMutations } = require('./services')
const { FAQsQueries, FAQsMutations } = require('./faqs')
const { CmsQueries, CmsMutations } = require('./cms')

const Query = {
    ...UserQueries,
    ...AboutQueries,
    ...ServicesQueries,
    ...FAQsQueries,
    ...CmsQueries
}
const Mutation = {
    ...UserMutations,
    ...AboutMutations,
    ...ServicesMutations,
    ...FAQsMutations,
    ...CmsMutations
}
module.exports = { Query, Mutation }

const { UserQueries, UserMutations } = require('./users')
const { AboutQueries, AboutMutations } = require('./about')
const { ServicesQueries, ServicesMutations } = require('./services')
const { FAQsQueries, FAQsMutations } = require('./faqs')

const Query = {
    ...UserQueries,
    ...AboutQueries,
    ...ServicesQueries,
    ...FAQsQueries
}
const Mutation = {
    ...UserMutations,
    ...AboutMutations,
    ...ServicesMutations,
    ...FAQsMutations
}
module.exports = { Query, Mutation }

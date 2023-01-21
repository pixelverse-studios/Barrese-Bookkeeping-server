const { UserQueries, UserMutations } = require('./users')
const { AboutQueries, AboutMutations } = require('./about')
const { ServicesQueries, ServicesMutations } = require('./services')

const Query = {
    ...UserQueries,
    ...AboutQueries,
    ...ServicesQueries
}
const Mutation = {
    ...UserMutations,
    ...AboutMutations,
    ...ServicesMutations
}
module.exports = { Query, Mutation }

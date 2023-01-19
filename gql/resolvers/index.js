const { UserQueries, UserMutations } = require('./users')
const { AboutQueries, AboutMutations } = require('./about')

const Query = {
    ...UserQueries,
    ...AboutQueries
}
const Mutation = {
    ...UserMutations,
    ...AboutMutations
}
module.exports = { Query, Mutation }

const { UserQueries, UserMutations } = require('./users')

const Query = {
    ...UserQueries
}
const Mutation = {
    ...UserMutations
}
module.exports = { Query, Mutation }

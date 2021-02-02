const { gql } = require('apollo-server')

const typeDefs = gql`
    union Given = Equipment | Supply
`

const resolvers = {
    Given: {
        __resolveType(given, context, info) {
            if (given.used_by) {
                return 'Equipment'
            }
            if (given.team) {
                return 'Supply'
            }
            return null
        }
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}
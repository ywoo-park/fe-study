const { gql } = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        postTeam(input: PostTeamInput!): Team!,
        editTeam(
            id: ID!,
            input: PostTeamInput!
        ): Team!
        deleteTeam(id: ID!): Team!

        postPerson(input: PostPersonInput): People!,
        editPerson(
            id: ID!,
            input: PostPersonInput!
        ): People!
        deletePerson(id: ID!): People!

        postEquipment(
            id: ID!,
            used_by: Role!,
            count: Int,
            new_or_used: NewOrUsed!
        ): Equipment!
        increaseEquipment(
            id: ID!,
        ): Equipment!
    }
`

module.exports = typeDefs
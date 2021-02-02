const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        teams(
            manager: String, 
            cleaning_duty: String
            ): [Team]
        team(id: ID!): Team
        people(
            page: Int, per_page: Int, 
            team: Int, 
            sex: Sex, 
            blood_type: BloodType, 
            from: String
            ): [People]
        person(id: ID!): People
        roles: [RoleInfo]
        role(id: ID!): RoleInfo
        equipments(
            used_by: Role, 
            new_or_used: NewOrUsed
            ): [Equipment]
        equipment(id: ID!): Equipment
        softwares(
            used_by: Role, 
            developed_by: String
            ): [Software]
        software(id: ID!): Software
        supplies(team: ID): [Supply]
        supply(id: ID!): Supply,
    }
`

module.exports = typeDefs
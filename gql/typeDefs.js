const { gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    enum ErrorTypes {
        # FORM
        badInput

        # USER
        userNotFound
        emailInUse
        invalidToken
        noUsersFound
        invalidCredentials
        matchingPasswords

        # GENERAL
        fetched
    }

    type ContactLinkTypes {
        icon: String
        url: String
        title: String
    }

    type CallToActionTypes {
        thumbnail: String
        emphasized: String
        description: String
    }

    type UserFields {
        _id: ID!
        email: String!
        password: String!
        firstName: String
        lastName: String
        address: String
        role: String
        background: String
        contactLinks: [ContactLinkTypes]
        callToAction: CallToActionTypes
        token: String
    }

    type MultipleUsersSuccess {
        users: [UserFields]
    }

    type UserSuccess {
        _id: ID!
        email: String!
        password: String!
        firstName: String
        lastName: String
        address: String
        role: String
        background: String
        contactLinks: [ContactLinkTypes]
        callToAction: CallToActionTypes
        token: String
    }

    type InputFieldError {
        field: String!
        message: String!
    }

    type Errors {
        type: ErrorTypes
        message: String
        errors: [InputFieldError]
    }

    union UserResponse = UserSuccess | Errors
    union MultiUserResponse = MultipleUsersSuccess | Errors

    # Inputs
    input ContactLinkInput {
        icon: String
        url: String
        title: String
    }

    input CallToActionInput {
        thumbnail: String
        emphasized: String
        description: String
    }

    type Query {
        # USERS
        getUser(email: String!): UserResponse!
        getAllUsers: MultiUserResponse!
        getLoggedInUser: UserResponse!
    }

    type Mutation {
        # USERS
        register(
            email: String!
            password: String!
            firstName: String!
            lastName: String!
        ): UserResponse
        login(email: String!, password: String!): UserResponse
        updateUser(
            address: String
            role: String
            background: String
            contactLinks: [ContactLinkInput]
            callToAction: CallToActionInput
        ): UserResponse
        updatePassword(
            email: String!
            newPassword: String!
            token: String!
        ): UserResponse
        deleteUser(id: String!): MultiUserResponse
        sendPasswordResetEmail(email: String!): UserResponse
    }
`

module.exports = typeDefs

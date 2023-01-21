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

        # CMS
        cmsItemNotFound

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
        profileImg: String
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
        profileImg: String
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

    type AboutSuccess {
        _id: ID!
        description: [String]
    }

    type ServiceOffering {
        icon: String
        title: String
        description: String
        bullets: [String]
    }

    type ServicesSuccess {
        _id: ID!
        pageH1: String
        pageH2: String
        description: String
        offerings: [ServiceOffering]
    }

    union CMSResponse = AboutSuccess | ServicesSuccess | Errors

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

        # ABOUT
        getAboutItems: CMSResponse

        # SERVICES
        getServices: CMSResponse
    }

    input ServiceOfferingFields {
        icon: String
        title: String
        description: String
        bullets: [String]
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
            profileImg: String
        ): UserResponse
        updatePassword(
            email: String!
            newPassword: String!
            token: String!
        ): UserResponse
        deleteUser(id: String!): MultiUserResponse
        sendPasswordResetEmail(email: String!): UserResponse

        # ABOUT
        createAboutItem(description: [String]!): CMSResponse
        editAboutItem(_id: ID!, updated: [String]!): CMSResponse

        # SERVICES
        editServices(
            _id: ID!
            pageH1: String
            pageH2: String
            description: String
            offerings: [ServiceOfferingFields]
        ): CMSResponse
    }
`

module.exports = typeDefs

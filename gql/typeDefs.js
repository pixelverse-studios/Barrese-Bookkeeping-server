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

    type MultiUsersSuccess {
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
    union MultiUserResponse = MultiUsersSuccess | Errors

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

    type FAQsSuccess {
        _id: ID!
        question: String
        answer: String
    }

    type MultiFAQsSuccess {
        faqs: [FAQsSuccess]
    }

    union AboutResponse = AboutSuccess | Errors
    union ServicesResponse = ServicesSuccess | Errors
    union FAQsResponse = FAQsSuccess | Errors
    union MultiFAQsResponse = MultiFAQsSuccess | Errors

    # union CMSResponse = AboutSuccess | ServicesSuccess | FAQsSuccess | Errors

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
        getAboutItems: AboutResponse

        # SERVICES
        getServices: ServicesResponse

        # FAQs
        getFAQs: MultiFAQsResponse
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
        createAboutItem(description: [String]!): AboutResponse
        editAboutItem(_id: ID!, updated: [String]!): AboutResponse

        # SERVICES
        editServices(
            _id: ID!
            pageH1: String
            pageH2: String
            description: String
            offerings: [ServiceOfferingFields]
        ): ServicesResponse

        # FAQs
        createFAQItem(question: String!, answer: String!): MultiFAQsResponse
        editFAQItem(
            _id: ID!
            question: String
            answer: String
        ): MultiFAQsResponse
        deleteFAQItem(_id: ID!): MultiFAQsResponse
    }
`

module.exports = typeDefs

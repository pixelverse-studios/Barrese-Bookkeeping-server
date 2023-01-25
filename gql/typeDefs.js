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
        noValidFieldsReceived

        # GENERAL
        fetched
    }

    type UserFields {
        _id: ID!
        email: String!
        password: String!
        firstName: String
        lastName: String
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

    # CMS
    type CallToActionFields {
        image: String
        heading: String
        description: String
    }

    type AboutFields {
        profilePic: String
        backgroundInfo: String
        role: String
        title: String
    }

    type ContactLinks {
        _id: ID!
        icon: String
        link: String
        title: String
    }

    type FooterFields {
        contactLinks: [ContactLinks]
        description: String
    }

    type ServiceOfferings {
        _id: ID!
        icon: String
        title: String
        description: String
        bullets: [String]
    }

    type ServicesFields {
        pageH1: String
        pageH2: String
        description: String
        offerings: [ServiceOfferings]
    }

    type FAQFields {
        _id: ID!
        question: String
        answer: String
    }

    type BlogFields {
        _id: ID!
        thumbnail: String
        image: String
        title: String
        recap: String
        createdAt: Date
    }

    type CmsFields {
        _id: ID!
        callToAction: CallToActionFields
        about: AboutFields
        footer: FooterFields
        services: ServicesFields
        faqs: [FAQFields]
        blog: [BlogFields]
    }

    union CmsResponse = CmsFields | Errors

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

        # CMS
        getAllCmsContent: CmsResponse
    }

    input ServiceOfferingFields {
        icon: String
        title: String
        description: String
        bullets: [String]
    }

    input InputCallToActionFields {
        image: String
        heading: String
        description: String
    }

    input InputAboutFields {
        profilePic: String
        backgroundInfo: String
        role: String
        title: String
    }

    input InputContactLinks {
        icon: String
        link: String
        title: String
    }

    input InputFooterFields {
        contactLinks: [InputContactLinks]
        description: String
    }

    input InputServiceOfferings {
        icon: String
        title: String
        description: String
        bullets: [String]
    }

    input InputServicesFields {
        pageH1: String
        pageH2: String
        description: String
        offerings: [InputServiceOfferings]
    }

    input InputFAQFields {
        question: String
        answer: String
    }

    input InputBlogFields {
        thumbnail: String
        image: String
        title: String
        recap: String
    }

    input InputCmsFields {
        callToAction: InputCallToActionFields
        about: InputAboutFields
        footer: InputFooterFields
        services: InputServicesFields
        faqs: [InputFAQFields]
        blog: [InputBlogFields]
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
        updatePassword(
            email: String!
            newPassword: String!
            token: String!
        ): UserResponse
        deleteUser(id: String!): MultiUserResponse
        sendPasswordResetEmail(email: String!): UserResponse

        # CMS
        createCmsContent(
            callToAction: InputCallToActionFields
            about: InputAboutFields
            footer: InputFooterFields
            services: InputServicesFields
            faqs: InputFAQFields
            blog: InputBlogFields
        ): CmsResponse
        editCallToAction(
            input: InputCallToActionFields
            cmsId: ID!
        ): CmsResponse
    }
`

module.exports = typeDefs

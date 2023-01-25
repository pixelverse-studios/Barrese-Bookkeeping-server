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
        _id: ID
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

        # ABOUT
        getAboutItems: AboutResponse

        # SERVICES
        getServices: ServicesResponse

        # FAQs
        getFAQs: MultiFAQsResponse

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

        # CMS
        createCmsContent(
            callToAction: InputCallToActionFields
            about: InputAboutFields
            footer: InputFooterFields
            services: InputServicesFields
            faqs: InputFAQFields
            blog: InputBlogFields
        ): CmsResponse
    }
`

module.exports = typeDefs

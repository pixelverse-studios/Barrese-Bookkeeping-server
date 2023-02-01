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
        minimumValidFieldsMissing
        allValidFieldsMissing

        # GENERAL
        fetched

        # NEWSLETTER
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

    # NEWSLETTER
    type NewsletterUserFields {
        _id: ID!
        email: String!
        firstName: String
        lastName: String
        createdAt: Date
        updatedAt: Date
        subscribed: Boolean
    }
    union NewsletterUserResponse = NewsletterUserFields | Errors

    type NewsletterRecordsFields {
        _id: ID!
        participants: [String]
        emailBody: [String]
        subjectLine: String
        sentAt: Date
    }
    union NewsletterRecordsResponse = NewsletterRecordsFields | Errors

    # CMS
    type CallToActionFields {
        image: String
        heading: String
        description: String
        buttonLabel: String
    }

    type AboutFields {
        profilePic: String
        backgroundInfo: String
        role: String
        title: String
        header: String
        subHeader: String
        heroImage: String
    }

    type ContactLinks {
        _id: ID!
        icon: String
        link: String
        title: String
    }

    type FooterFields {
        contactLinks: [ContactLinks]
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
        heroImage: String
        offerings: [ServiceOfferings]
    }

    type FAQs {
        _id: ID!
        question: String
        answer: String
    }

    type FAQFields {
        pageH1: String
        pageH2: String
        heroImage: String
        qAndA: [FAQs]
    }

    type BlogItem {
        _id: ID!
        thumbnail: String
        image: String
        title: String
        recap: String
        content: [String]
        createdAt: Date
    }

    type BlogFields {
        pageH1: String
        pageH2: String
        heroImage: String
        blogs: [BlogItem]
    }

    type LandingFields {
        heroImage: String
        heroBannerH1: String
        heroBannerH2: String
        subtext: String
    }

    type CmsFields {
        _id: ID!
        landing: LandingFields
        callToAction: CallToActionFields
        about: AboutFields
        footer: FooterFields
        services: ServicesFields
        faqs: FAQFields
        blog: BlogFields
    }

    union CmsResponse = CmsFields | Errors

    # Inputs
    input CallToActionInput {
        thumbnail: String
        emphasized: String
        description: String
        buttonLabel: String
    }

    type Query {
        # USERS
        getUser(email: String!): UserResponse!
        getAllUsers: MultiUserResponse!
        getLoggedInUser: UserResponse!

        # CMS
        getAllCmsContent: CmsResponse

        # NEWSLETTER USERS
        getSubscribedUsers: NewsletterUserResponse
        getAllNewsletterUsers: NewsletterUserResponse

        # NEWSLETTER RECORDS
        getAllNewsletterRecords: NewsletterRecordsResponse
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
        buttonLabel: String
    }

    input InputAboutFields {
        profilePic: String
        backgroundInfo: String
        role: String
        title: String
        header: String
        subHeader: String
        heroImage: String
    }

    input InputContactLinks {
        icon: String
        link: String
        title: String
    }

    input InputFooterFields {
        contactLinks: [InputContactLinks]
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
        heroImage: String
        offerings: [InputServiceOfferings]
    }

    input InputFAQFields {
        question: String
        answer: String
    }

    input InputFAQContent {
        pageH1: String
        pageH2: String
        heroImage: String
    }

    input InputFAQItems {
        pageH1: String
        pageH2: String
        heroImage: String
        qAndA: [InputFAQFields]
    }

    input InputBlogItem {
        thumbnail: String
        image: String
        title: String
        recap: String
        content: [String]
    }

    input InputBlogContent {
        pageH1: String
        pageH2: String
        heroImage: String
    }

    input InputBlogFields {
        pageH1: String
        pageH2: String
        heroImage: String
        blogs: [InputBlogItem]
    }

    input InputLandingFields {
        heroImage: String
        heroBannerH1: String
        heroBannerH2: String
        subtext: String
    }

    input InputServiceContentFields {
        pageH1: String
        pageH2: String
        description: String
        heroImage: String
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
            faqs: InputFAQItems
            blog: InputBlogFields
            landing: InputLandingFields
        ): CmsResponse
        editCallToAction(
            input: InputCallToActionFields
            cmsID: ID!
        ): CmsResponse
        editLanding(input: InputLandingFields, cmsID: ID!): CmsResponse
        editAbout(input: InputAboutFields, cmsID: ID!): CmsResponse
        editFooter(input: InputFooterFields, cmsID: ID!): CmsResponse
        editServiceContent(
            input: InputServiceContentFields
            cmsID: ID!
        ): CmsResponse
        createServiceOffering(
            input: InputServiceOfferings
            cmsID: ID!
        ): CmsResponse
        editServiceOffering(
            input: InputServiceOfferings
            offeringID: ID!
            cmsID: ID!
        ): CmsResponse
        deleteServiceOffering(offeringID: ID!, cmsID: ID!): CmsResponse
        createFaqItem(input: InputFAQFields, cmsID: ID!): CmsResponse
        editFaqItem(input: InputFAQFields, faqID: ID!, cmsID: ID!): CmsResponse
        deleteFaqItem(faqID: ID!, cmsID: ID!): CmsResponse
        editFaqContent(input: InputFAQContent, cmsID: ID!): CmsResponse
        createBlogItem(input: InputBlogItem, cmsID: ID!): CmsResponse
        editBlogItem(input: InputBlogItem, blogID: ID!, cmsID: ID!): CmsResponse
        deleteBlogItem(blogID: ID!, cmsID: ID!): CmsResponse
        editBlogContent(input: InputBlogContent, cmsID: ID!): CmsResponse

        # NEWSLETTER USERS
        addUserToNewsletter(
            email: String!
            firstName: String!
            lastName: String!
        ): NewsletterUserResponse
        updateSubscriptionStatus(
            email: String!
            subscribed: Boolean!
        ): NewsletterUserResponse

        # NEWSLETTER RECORDS
        dispatchNewsletter(
            emailBody: [String]!
            subjectLine: String!
        ): NewsletterRecordsResponse
    }
`

module.exports = typeDefs

const __typename = 'Errors'

module.exports = {
    userExistsInNewsletter: () => ({
        __typename,
        type: 'userExistsInNewsletter',
        message: 'That user is already subscribed to the newsletter'
    }),
    userNotInNewsletter: () => ({
        __typename,
        type: 'userNotInNewsletter',
        message: 'The user does is not currently apart of the newsletter'
    }),
    noDataFound: label => ({
        __typename,
        type: 'noDataFound',
        message: `No ${label} found`
    })
}

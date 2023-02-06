const USERS_SINGLE = 'NewsletterUserFields'
const USERS_MULTIPLE = 'NewsletterUserSuccess'
const RECORDS_SINGLE = 'NewsletterRecordsFields'
const RECORDS_MULTIPLE = 'NewsletterRecordsSuccess'

const baseArrayResponse = (data, key, __typename) => ({
    __typename,
    [key]: data
})

const baseResponse = (data, __typename) => {
    const response = {
        __typename,
        ...data._doc
    }

    return response
}

module.exports = {
    userAdded: data => baseResponse(data, USERS_SINGLE),
    statusUpdated: data => baseResponse(data, USERS_SINGLE),
    usersFetched: data => baseArrayResponse(data, 'users', USERS_MULTIPLE),
    newsletterSent: data => baseResponse(data, RECORDS_SINGLE),
    recordsFetched: data => baseResponse(data, 'records', RECORDS_MULTIPLE)
}

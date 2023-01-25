const SINLGE_RESPONSE = 'CmsFields'

const baseArrayResponse = ({ data, __typename, key }) => ({
    __typename,
    [key]: data
})

const baseResponse = data => {
    const response = {
        __typename: SINLGE_RESPONSE,
        ...data._doc
    }

    return response
}

module.exports = {
    edited: data => baseResponse(data),
    contentFetched: data => baseResponse(data)
}

const baseArrayResponse = ({ data, __typename, key }) => ({
    __typename,
    [key]: data
})

const baseResponse = ({ data, __typename }) => {
    const response = {
        __typename,
        ...data._doc
    }

    return response
}

const routeForResponseType = (data, typename, key) => {
    if (typename.includes('Multi')) {
        return baseArrayResponse({ data, __typename: typename, key })
    }

    return baseResponse({ data, __typename: typename })
}

module.exports = {
    cmsUpdated: (data, typename, key) =>
        routeForResponseType(data, typename, key),
    cmsItemFetched: (data, typename, key) =>
        routeForResponseType(data, typename, key)
}

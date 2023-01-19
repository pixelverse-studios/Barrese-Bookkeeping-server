const baseArrayResponse = ({ data, __typename }) => ({
    __typename,
    data
})

const baseResponse = ({ data, __typename }) => {
    const response = {
        __typename,
        ...data._doc
    }

    return response
}

const routeForResponseType = (data, typename) => {
    if (typename.includes('Multiple')) {
        return baseArrayResponse({ data, __typename: typename })
    }

    return baseResponse({ data, __typename: typename })
}

module.exports = {
    cmsUpdated: (data, typename) => routeForResponseType(data, typename),
    cmsItemFetched: (data, typename) => routeForResponseType(data, typename)
}

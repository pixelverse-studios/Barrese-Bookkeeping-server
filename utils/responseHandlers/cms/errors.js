const TYPENAME = 'Errors'

module.exports = {
    cmsItemNotFound: descriptor => ({
        __typename: TYPENAME,
        type: 'cmsItemNotFound',
        message: `${descriptor} not found or does not exist.`
    }),
    noValidFieldsReceived: (fields, item) => ({
        __typename: TYPENAME,
        type: 'noValidFieldsReceived',
        message: `At least one of the following fields is required for ${item}: ${fields}`
    })
}

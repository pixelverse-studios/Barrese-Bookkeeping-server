const __typename = 'Errors'

module.exports = {
    cmsItemNotFound: descriptor => ({
        __typename,
        type: 'cmsItemNotFound',
        message: `${descriptor} not found or does not exist.`
    }),
    minimumValidFieldsMissing: (fields, item) => ({
        __typename,
        type: 'minimumValidFieldsMissing',
        message: `At least one of the following fields is required for ${item}: ${fields}`
    }),
    allValidFieldsMissing: (fields, item) => ({
        __typename,
        type: 'allValidFieldsMissing',
        message: `All of the following fields are required for ${item}: ${fields}`
    })
}

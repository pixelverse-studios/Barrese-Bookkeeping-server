const __typename = 'Errors'

module.exports = {
    badInput: errors => ({
        __typename,
        type: 'badInput',
        errors
    }),
    someFieldsRequired: (fields, item) => ({
        __typename,
        type: 'someFieldsRequired',
        message: `At least one of the following fields is required for ${item}: ${fields}`
    }),
    allFieldsRequired: (fields, item) => ({
        __typename,
        type: 'allFieldsRequired',
        message: `All of the following fields are required for ${item}: ${fields}`
    })
}

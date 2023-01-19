const TYPENAME = 'Errors'

module.exports = {
    cmsItemNotFound: descriptor => ({
        __typename: TYPENAME,
        type: 'cmsItemNotFound',
        message: `${descriptor} not found or does not exist.`
    })
}

const __typename = 'Errors'

module.exports = {
    cmsItemNotFound: descriptor => ({
        __typename,
        type: 'cmsItemNotFound',
        message: `${descriptor} not found or does not exist.`
    })
}

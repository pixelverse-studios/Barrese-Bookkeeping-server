const userErrors = require('./user/errors')
const userSuccess = require('./user/success')
const formErrors = require('./formInput/errors')
const generalSuccess = require('./general/success')
const cmsSuccess = require('./cms/success')
const cmsErrors = require('./cms/errors')
const newsletterSuccess = require('./newsletter/success')
const newsletterErrors = require('./newsletter/errors')

const buildResponse = {
    user: { errors: userErrors, success: userSuccess },
    cms: { success: cmsSuccess, errors: cmsErrors },
    input: { errors: formErrors },
    general: { success: generalSuccess },
    newsletter: { errors: newsletterErrors, success: newsletterSuccess }
}

module.exports = buildResponse

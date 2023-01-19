const userErrors = require('./user/errors')
const userSuccess = require('./user/success')
const formErrors = require('./formInput/errors')
const generalSuccess = require('./general/success')
const cmsSuccess = require('./cms/success')
const cmsErrors = require('./cms/errors')

const buildResponse = {
    user: { errors: userErrors, success: userSuccess },
    cms: { success: cmsSuccess, errors: cmsErrors },
    form: { errors: formErrors },
    general: { success: generalSuccess }
}

module.exports = buildResponse

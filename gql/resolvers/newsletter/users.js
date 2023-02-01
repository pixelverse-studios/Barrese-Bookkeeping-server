module.exports.NewsletterUserMutations = {
    async addUserToNewsletter(_, input, context) {
        console.log(input)
    },
    updateSubscriptionStatus() {}
}
module.exports.NewsletterUserQueries = {
    getSubscribedUsers() {},
    getAllNewsletterUsers() {}
}

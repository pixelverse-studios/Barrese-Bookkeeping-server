const { createTransporter } = require('./')

const headerRender = `<header>Barrese Bookkeeping</header>`
const footerRender = `<div>create email signature here</div>`

const sendGeneralNewsletter = async (emailBody, subjectLine, participants) => {
    try {
        const transporter = await createTransporter()

        let formattedEmailBody = ''
        emailBody.forEach(p => (formattedEmailBody += `<p>${p}</p>`))
        participants.forEach(async ({ email, firstName }) => {
            const html = `
                <section>
                    ${headerRender}
                    <div>
                        <h3 style="margin-bottom: 1rem;">Hi ${firstName},</h3>
                        ${formattedEmailBody}
                    </div>
                    ${footerRender}
                </section>
            `

            await transporter.sendMail({
                subject: subjectLine,
                html,
                to: email,
                from: process.env.EMAIL_USER
            })
            return true
        })
    } catch (error) {
        throw error
    }
}

module.exports = { sendGeneralNewsletter }

const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port:   process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMTP_PASSWORD
            }

        })
    }
    
    async sendActivationMail ( to, link) {
        await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.CLIENT_URL,
            text: "",
            html:
            `
                <div>
                <h1>
                для активации перейдите по ссылке
                </h1>
                <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()
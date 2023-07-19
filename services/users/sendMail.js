const nodemailer = require('nodemailer')
const pug = require('pug')
const path = require('path')

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email
        this.url = url
        this.from = `Project Admin <${process.env.EMAIL_SENDER_MAIL}>`
    }

    _initTransport() {
        return nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    }

    async _send(template, subject) {
        const html = pug.renderFile(path.join(__dirname, '..', '..', 'views', 'emails', `${template}.pug`), {
            url: this.url,
            subject,
        })

        const emailConfig = {
            from: this.from,
            to: this.to,
            subject,
            html,
        }

        await this._initTransport().sendMail(emailConfig)
    }

    async sendVerifyMail() {
        await this._send('verifyUserMail', 'User email verification instruction')
    }
}
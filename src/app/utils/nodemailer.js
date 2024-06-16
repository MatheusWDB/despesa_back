const nodemailer = require('nodemailer')

const user = ''
const pass = ''
const port = 0

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: port,
    auth: { user, pass }
})
const mailOptions = {
    from: '"Seu Nome" <seu_email@example.com>',
    to: "destinatario@example.com",
    subject: "Assunto do E-mail",
    text: "Corpo do e-mail em texto plano",
    html: "<b>Corpo do e-mail em HTML</b>"
}

transporter.sendMail(mailOptions)

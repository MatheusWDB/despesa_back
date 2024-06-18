const nodemailer = require('nodemailer')
require('dotenv').config()

const user = process.env.USEREMAIL
const pass = process.env.PASSEMAIL
const port = 587

const transporter = nodemailer.createTransport({
    host: process.env.HOSTEMAIL,
    port: port,
    auth: { user, pass }
})

module.exports = transporter

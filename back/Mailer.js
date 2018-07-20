const nodemailer = require('nodemailer')
const credentials = require('./credentials.json')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: credentials
})

const sendEmail = (email, subject, html, callback) => {
  const mailOptions = {
    from: credentials.user,
    to: email,
    subject: subject,
    html: html
  }
  
  transporter.sendMail(mailOptions, callback)
}

module.exports = sendEmail
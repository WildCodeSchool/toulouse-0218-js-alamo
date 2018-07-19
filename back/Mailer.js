const nodemailer = require('nodemailer')
const credentials = require('./credentials.json')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: credentials
})

const sendEmail = (email, subject, content, callback) => {
  const mailOptions = {
    from: credentials.user,
    to: `${email}`,
    subject: subject,
    html: content
  }
  
  transporter.sendMail(mailOptions, callback)
}

module.exports = sendEmail
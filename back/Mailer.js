const nodemailer = require('nodemailer')
const credentials = require('./credentials.json')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: credentials
})

const sendEmail = (req, res, subject, content, callback) => {
  const mailOptions = {
    from: credentials.user,
    to: `${req.body.email}`,
    subject: subject,
    html: content
  }
  
  transporter.sendMail(mailOptions, callback)
}

module.exports = sendEmail
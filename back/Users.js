const fs            =  require('fs')
const express       =  require('express')
const router        =  express.Router()
const nodemailer    =  require('nodemailer')
const Mustache      =  require('mustache')
const connection    =  require('./db.js')
const credentials   =  require('./credentials.json')
const template      =  fs.readFileSync('./templates/inscription.html').toString()
// const template = fs.readFileSync(`${__dirname}/templates/bookingPartner.html`).toString()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: credentials
})
const html = Mustache.render(template)

router.post('/register', function(req, res) {
  console.log(req.body)
  const mailOptions = {
    from: credentials.user,
    to: `${req.body.email}`,
    subject: "Confirmation d'inscription",
    html: html
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Erreur Fatale !!!!', err)
    } else {
      console.log('OK', info)
    }
  })
  const query = `INSERT INTO booker (familyName, firstName, pseudo, email, password) VALUE ('${req.body.familyName}', '${req.body.firstName}',
   '${req.body.pseudo}', '${req.body.email}', '${req.body.password}')`
  connection.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    if (result.length === 0) {
      return res.json({error: "Something bad happens"})
    }
    res.json(
      result
    )
    console.log(res.json)
  })
})

router.post('/login', function(req, res) {
  console.log(req.body)
  const query = `SELECT * FROM booker WHERE pseudo='${req.body.pseudo}' AND password='${req.body.password}'`
  connection.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    if (result.length === 0) {
      return res.json({error: "Your account or password is incorrect"})
    }
    const user = result[0]
    req.session.user = user
    res.json(
      user
    )
    console.log(res.json)
  })
})

module.exports = router
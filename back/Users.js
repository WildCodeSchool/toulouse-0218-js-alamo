const express       =  require('express')
const router        =  express.Router()
const connection    =  require('./db.js')
const nodemailer    =  require('nodemailer')
const credentials   =  require('./credentials.json')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: credentials
})

router.post('/register', function(req, res) {
  console.log(req.body)
  const mailOptions = {
    from: credentials.user,
    to: `${req.body.email}`,
    subject: "Confirmation d'inscription",
    html: "<h1>Mail test Alamo</h1></br><p>Well done bro, tu es inscrit ;)</p>"
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
const express = require('express')
const router = express.Router()
const connection = require('./db.js')

router.post('/register', function(req, res) {
  console.log(req.body)
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

module.exports = router
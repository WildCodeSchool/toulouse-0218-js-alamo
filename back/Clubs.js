const express = require('express')
const router = express.Router()
const connection = require('./db.js')


router.post('/login', function(req, res) {
  console.log(req.body)
  const query = `SELECT * FROM manager WHERE clubName='${req.body.name}' and password='${req.body.password}'`
  connection.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    if (result.length === 0) {
      return res.json({error: "Your account or password is incorrect"})
    }
    res.json(
      result
    )
  })
})

module.exports = router
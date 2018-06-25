const express = require('express')
const router = express.Router()
const connection = require('./db.js')


router.post('/login', function(req, res) {
  console.log(req.body)
  const query = `SELECT * FROM manager WHERE clubName='${req.body.name}' and password='${req.body.password}'`
  const {name, password} = req.body
  connection.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    res.json(
      result
    )
    console.log(res.json)
  })
})

module.exports = router
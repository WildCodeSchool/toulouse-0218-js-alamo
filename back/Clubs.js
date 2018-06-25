const express = require('express')
const router = express.Router()
const connection = require('./db.js')


router.post('/login', function(req, res) {
  const query = 'SELECT * FROM manager'
  connection.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    res.json(
      result[0]
    )
    console.log(res.json)
  })
})

module.exports = router
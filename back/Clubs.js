const express     = require('express')
const router      = express.Router()
const connection  = require('./db.js')

router.post('/login', function(req, res) {
  console.log(req.body)
  const { name, password } = req.body
  const query = `SELECT * FROM manager WHERE clubName='${name}' and password='${password}'`
  connection.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    if (result.length === 0) {
      return res.status(401).json({error: "Your account or password is incorrect"})
    }
    req.session.user = result[0]
    res.json(
      result[0]
    )
  })
})

module.exports = router
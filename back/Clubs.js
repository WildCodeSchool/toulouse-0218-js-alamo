const express     = require('express')
const router      = express.Router()
const connection  = require('./db.js')

//route de vérification si les identifiants entrés existent et récupération de ses données
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

//route de récupération de session
router.get('/status', function(req,res) {
  const user = req.session ? req.session.user : null
  res.json(
    {user: user}
  )
})

module.exports = router
const express     = require('express')
const router      = express.Router()
const connection  = require('./db.js')

//route de vérification si les identifiants entrés existent et récupération de ses données
router.post('/login', function(req, res) {
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
  // if (user === null) {
  //   req.session.destroy
  // }
})

router.get('/logout', function(req, res) {
  req.session.destroy()
  res.json(null)
})

router.get('/:id', (req, res) => {
  // Extrait l'id du club depuis l'URL
  const { id } = req.params
  // Prépare la query
  const query = 'SELECT * FROM manager WHERE id = ?'
  // Envoie la query
  connection.query(query, [id], (error, managers) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    // Si le manager avec l'id demandé n'existe pas,
    // il faut renvoyer une 404
    if(managers.length === 0) {
      return res.status(404).json({
        error: `Manager with id ${id} could not be found`
      })
    }
    // Le résultat est un tableau, on extrait son unique élément
    const manager = managers[0]
    // On doit supprimer le password des données à renvoyer au client
    delete manager.password
    res.json(manager)
  })
})

module.exports = router
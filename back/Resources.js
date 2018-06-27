const express = require('express')
const router = express.Router()
const connection = require('./db.js')

router.post('/', function(req, res) {
  console.log(req.body)
  const query = `INSERT INTO resource (managerId, title) VALUES (?,?)`
  connection.query(query,[req.body.managerId, req.body.title], (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    console.log(result)
    connection.query(`SELECT * FROM resource WHERE id = ?`,
      [result.insertId], (error, resources) => {
        if (error) {
          return res.status(500).json({
            error: error.message
          })
        }
        res.json(
          resources[0]
        )
    })
  })
})

router.get('/', (req, res) => {
  const managerId = req.session.user.id

  connection.query(`SELECT * FROM resource WHERE managerId = ?`,
  [managerId], (error, resources) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    res.json(
      resources
    )
  })
})


module.exports = router
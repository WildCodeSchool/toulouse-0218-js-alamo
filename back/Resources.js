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

router.put('/:id', function(req, res) {
  const {
    title
  } = req.body
  const query = `UPDATE resource SET title = ? WHERE id = ?`
  connection.query(query,[title, req.params.id], (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    console.log(result)
    connection.query(`SELECT * FROM resource WHERE id = ?`,
      [req.params.id], (error, resources) => {
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

router.delete('/:id', (req, res) => {
  connection.query(`DELETE FROM resource WHERE id = ?`, [req.params.id], (error) => { 
    if (error) {
      return res.status(500).json({ 
        error: error.message
      })
    } 
    res.json({
      id: req.params.id
    }) 
  })
})

module.exports = router
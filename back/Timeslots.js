const express = require('express')
const router = express.Router()
const connection = require('./db.js')

router.post('/', function(req, res) {
  console.log(req.body)
  const {
    title, startHour, endHour, dayOfWeek, resourceId
  } = req.body
  const query = `INSERT INTO timeSlot (title, startHour, endHour, dayOfWeek, resourceId) VALUES (?, ?, ?, ?, ?)`
  connection.query(query,[title, startHour, endHour, dayOfWeek, resourceId], (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    console.log(result)
    connection.query(`SELECT * FROM timeSlot WHERE id = ?`,
      [result.insertId], (error, timeslots) => {
        if (error) {
          return res.status(500).json({
            error: error.message
          })
        }
        res.json(
          timeslots[0]
        )
    })
  })
})

router.get('/', (req, res) => {
  const managerId = req.session.user.id

  connection.query(`SELECT * FROM resource WHERE managerId = ?`,
  [managerId], (error, timeslots) => {
    if (error) {
      return res.status(500).json({ 
        error: error.message
      })
    }
    res.json(
      timeslots
    )
  })
})


module.exports = router
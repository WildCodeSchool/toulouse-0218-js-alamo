const express = require('express')
const router = express.Router()
const connection = require('./db.js')

router.get('/:managerId/:slotId/:date', (req, res) => {
  // Extrait l'id du club depuis l'URL
  const { managerId, slotId, date } = req.params
  // Prépare la query
  const query = `
    SELECT
      ts.startHour, ts.endHour,
      m.id AS managerId, m.clubName, m.address, m.email, m.city, m.lat, m.lng, m.member,
      s.label as sport
    FROM
      timeSlot ts
    INNER JOIN resource r ON ts.resourceId = r.id
    INNER JOIN manager m ON r.managerId = m.id
    INNER JOIN sport s ON r.sportId = s.id
    WHERE ts.id = ? AND m.id = ?`
  // Envoie la query
  connection.query(query, [slotId, managerId], (error, results) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    res.json(results)
  })
})

module.exports = router
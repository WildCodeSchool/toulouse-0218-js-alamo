const express = require('express')
const router = express.Router()
const connection = require('./db.js')

router.get('/:managerId/:slotId/:date', (req, res) => {
  // Extrait l'id du club, du slot, et la date de réservation demandée, depuis l'URL
  const { managerId, slotId, date } = req.params
  const query1 = `
    SELECT
      ts.startHour, ts.endHour,
      r.title,
      m.id AS managerId, m.clubName, m.address, m.email, m.city, m.lat, m.lng, m.member,
      s.label as sport
    FROM
      timeSlot ts
    INNER JOIN resource r ON ts.resourceId = r.id
    INNER JOIN manager m ON r.managerId = m.id
    INNER JOIN sport s ON r.sportId = s.id
    WHERE ts.id = ? AND m.id = ?`
  const query2 = `SELECT * FROM reservation WHERE timeSlotId = ? AND date = ?`
  connection.query(query1, [slotId, managerId], (error, data) => {
    if (error) {
      return res.status(500).json({
        error: error.message
      })
    }
    if(data.length === 0) {
      return res.json({ data: null, available: false })
    }
    connection.query(query2, [slotId, date], (error, bookings) => {
      if (error) {
        return res.status(500).json({
          error: error.message
        })
      }
      if(bookings.length > 0) {
        console.log(`already has booking for timeslot ${slotId} on ${date}`, bookings)
        return res.json({ data: data[0], available: false })
      }
      res.json({ data: data[0], available: true })
    })
  })
})

module.exports = router
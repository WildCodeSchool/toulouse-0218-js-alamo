const db = require('../back/db')
const { promisify } = require('util')
const queryAsync = promisify(db.query.bind(db))
const Promise = require('bluebird')
const managers = require('./managers.json')
const sports = require('./sports.json')
const resources = require('./resources.json')

const resetTable = table => queryAsync(`DELETE FROM ${table}`)
  .then(() => queryAsync(`ALTER TABLE ${table} AUTO_INCREMENT = 1`))

const insertManager = m => {
	const { clubName, password, address, postalCode, city, lat, lng, email, member } = m
	const query = `INSERT INTO manager(clubName, password, address, postalCode, city, lat, lng, email, member)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
	return queryAsync(query, [clubName, password, address, postalCode, city, lat, lng, email, member])
	.then(r => `SELECT * from manager WHERE id = ${r.insertId}`)
	.then(query => queryAsync(query))
	.then(r => r[0])
}

const insertData = (table, d) => {
  const query = `INSERT INTO ${table} SET ?`
  return queryAsync(query, d)
  .then(r => `SELECT * from ${table} WHERE id = ${r.insertId}`)
  .then(query => queryAsync(query))
  .then(r => r[0])
}

const findBy = (table, key, value) => queryAsync(`SELECT * FROM ${table} WHERE ${key} = ?`, [value])
  .then(r => r[0])

const insertResource = r => {
  const { manager, sport, title } = r
  let managerId
  let sportId
  return findBy('manager', 'clubName', manager)
  .then(m => { managerId = m.id })
  .then(() => findBy('sport', 'label', sport))
  .then(s => { sportId = s.id })
  .then(() => insertData('resource', {
    sportId, managerId, title
  }))
}

const getRndHour = (base, variation) => 60 * (base + Math.floor(variation * Math.random()))

const formatHour = hour => {
  const minutes = (hour % 60).toString()
  const hours = (Math.floor(hour / 60)).toString()
  return hours.padStart(2, '0') + ':' + minutes.padStart(2, '0')
}

const createTimeslots = resourceId => {
  const slots = []
  const hourMin = getRndHour(6, 4)
  const hourMax = getRndHour(16, 6)
  const duration = 45 + 15 * Math.floor(4 * Math.random())
  const interval = 15 + 15 * Math.floor(2 * Math.random())
  console.log(hourMin, hourMax, duration, interval)
  for(let d = 0 ; d < 7 ; d++) {
    if(Math.random() < 0.2) continue
    for(let h = hourMin ; h < hourMax ; h += duration + interval) {
      const startHour = formatHour(h)
      const endHour = formatHour(h + duration)
      slots.push({
        resourceId, startHour, endHour, dayOfWeek: d, title: 'Event ' + startHour 
      })
    }
  }
  return Promise.map(slots, s => insertData('timeSlot', s))
}

Promise.map(['resource', 'sport', 'manager'], t => resetTable(t))
.then(() => Promise.map(managers, m => insertManager(m)))
.then(() => Promise.map(sports, s => insertData('sport', s)))
.then(() => Promise.map(resources, r => insertResource(r)))
.then(records => Promise.map(records, r => createTimeslots(r.id)))
.then(timeslots => console.log(timeslots))
.then(() => process.exit())
// createTimeslots(1)

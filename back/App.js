const  http         =  require('http')
const  path         =  require('path')
const  express      =  require('express')
const  bodyParser   =  require('body-parser')
const  morgan       =  require('morgan')
const  session      =  require('express-session')

const  app          =  express()

const  clubs        =  require('./Clubs')
const  users        =  require('./Users')
const  connection   =  require('./db.js')
const  resources    =  require('./Resources')
const  timeslots    =  require('./Timeslots')

app.use(morgan('dev'))
// Voir Benoit pour secret
app.use(session({ secret: "alamo", resave: true, saveUninitialized: true }))
app.use(bodyParser.urlencoded({ extended:  false }))
app.use(bodyParser.json())
app.use(express.static(__dirname  +  '/public'))

app.get('/api/cities',(req, res)=> {
  const search = req.query.search
  const query = `select ville_nom_reel as label, ville_slug as slug From villes_france_free where ville_nom_reel LIKE '${search}%' limit 6`
  connection.query(query,(error, result)=>{
      if (error){
          return res.status(500).json([])
      }
      console.log(result['O'])
      res.json(result)
  })
})

app.get('/api/cities/by-slug/:slug', (req, res) => {
  const urlSlug = req.params.slug
  const query = `SELECT * From villes_france_free where ville_slug = '${urlSlug}'`
  connection.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({error: error.message})
    }
    res.json(result[0])
  })
})

app.get('/api/cities/:city/sport-match/:sport', (req, res) => {
  const sport = req.params.sport
  const city = req.params.city
  const query1 = `SELECT * from villes_france_free where ville_slug = ?`
  connection.query(query1, [city], (error, result) => {
    if (error) {
      return res.status(500).json({error: error.message})
    }
    const city = result[0]
    const margin = 0.2
    const latMin = city.lat - margin
    const latMax = city.lat + margin
    const lngMin = city.lng - margin
    const lngMax = city.lng + margin
    const query2 = `SELECT ts.*, m.id AS managerId, m.clubName, m.address, m.city, m.lat, m.lng FROM timeSlot ts 
    INNER JOIN resource r ON ts.resourceId = r.id 
    INNER JOIN sport s ON r.sportId = s.id 
    INNER JOIN manager m ON r.managerId = m.id 
    WHERE m.lng >= ${lngMin} AND m.lng <= ${lngMax} AND m.lat >= ${latMin} AND m.lat <= ${latMax}
    AND s.slug = ?`
    console.log(query2)
    connection.query(query2, [sport], (error, timeSlots) => {
      res.json(timeSlots)
    })
  })
})

//routes d'échange avec BDD
app.use("/api/clubs", clubs)
app.use("/api/users", users)
app.use("/api/resources", resources)
app.use("/api/timeslots",timeslots)

//erreur
app.use(function(req, res, next) {
  var  err  =  new  Error('Not Found')
  err.status  =  404
  next(err)
})

let  server  =  app.listen( process.env.PORT  ||  5000, function(){
  console.log('Listening on port http://localhost:5000/')
})
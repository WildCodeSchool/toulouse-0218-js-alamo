const  http         =  require('http')
const  path         =  require('path')
const  express      =  require('express')
const  bodyParser   =  require('body-parser')
const  morgan       =  require('morgan')
const  session      =  require('express-session')
// const  cors         =  require('cors')

const  app          =  express()

const  clubs        =  require('./Clubs')
const  users        =  require('./Users')
const  connection   =  require('./db.js')
const  resources    =  require('./Resources')
const  timeslots    =  require('./Timeslots')
const  bookings    =  require('./Bookings')

app.use(morgan('dev'))
// Voir Benoit pour secret
app.use(session({ secret: "alamo", resave: true, saveUninitialized: true }))
app.use(bodyParser.urlencoded({ extended:  false }))
app.use(bodyParser.json())
app.use('/manager', express.static(path.normalize(`${__dirname}/../front-manager/build`)))
app.use(express.static(__dirname  +  '/public'))

/* TESTS de Benoit, pas touche !!! */
/* const whitelist = ['https://alamo.wild31.com', 'https://manager.alamo.wild31.com']
const corsOptions = {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
*/
app.get('/api/cities',(req, res)=> {
  const search = req.query.search
  const query = `select ville_nom_reel as label, ville_slug as slug From villes_france_free where ville_nom_reel LIKE '${search}%' limit 2`
  connection.query(query,(error, result)=>{
      if (error){
          return res.status(500).json([])
      }
      console.log(result[0])
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

// Le tableau timeSlots renvoyé par la 2è requête SQL ci-dessous
// contient tous les évènements qui matchent les critères de ville
// et de sport.
// Problème: même s'ils contiennent les infos de latitude et longitude des clubs,
// on ne peut pas s'en servir directement côté front, car les infos des clubs sont
// en doublons (on peut avoir plusieurs time slots avec le même club)
// Cette fonction va extraire une liste de clubs à partir des time slots, en éliminant
// les doublons
const getUniqueMarkers = timeSlots => timeSlots.reduce(
  (markers, timeSlot) => {
    // Extrait juste les infos du clubs à partir du timeslot
    const {managerId, clubName, address, city, lat, lng, member, email} = timeSlot
    // Crée un nouvel objet contenant ces infos
    const newMarker = {id: managerId, clubName, address, city, lat, lng, member, email}
    // Le tableau markers (accumulateur du reduce) contient les marqueurs/clubs
    // qu'on veut renvoyer au client. Avant d'ajouter newMarker à markers,
    // on vérifie d'abord qu'il n'y est pas déjà
    const marker = markers.find(m => m.id === managerId)
    // Si le marqueur existe déjà, on retourne markers non modifié
    if(marker) {
      return markers
    }
    // Sinon on l'ajoute:
    // concatenation du tableau markers et de l'élément newMarker
    return [...markers, newMarker]
  }, []
)

app.get('/api/cities/:city/sport-match/:sport', (req, res) => {
  const sport = req.params.sport
  const city = req.params.city
  const query1 = `SELECT * from villes_france_free where ville_slug = ?`
  connection.query(query1, [city], (error, result) => {
    if (error) {
      return res.status(500).json({error: 'erreur query1' + error.message})
    }
    const city = result[0]
    if(result.length === 0) {
      return res.json({markers: [], timeSlots: [], city: null})
    }
    const margin = 0.2
    const latMin = city.lat - margin
    const latMax = city.lat + margin
    const lngMin = city.lng - margin
    const lngMax = city.lng + margin
    const query2 = `SELECT ts.*, m.id AS managerId, m.clubName, m.address, m.email, m.city, m.lat, m.lng, m.member FROM timeSlot ts 
    INNER JOIN resource r ON ts.resourceId = r.id 
    INNER JOIN sport s ON r.sportId = s.id 
    INNER JOIN manager m ON r.managerId = m.id 
    WHERE m.lng >= ${lngMin} AND m.lng <= ${lngMax} AND m.lat >= ${latMin} AND m.lat <= ${latMax}
    AND s.slug = ?`
    console.log(query2)
    connection.query(query2, [sport], (error, timeSlots) => {
      if (error) {
        return res.status(500).json({error: error.message})
      }
      const markers = getUniqueMarkers(timeSlots)
      const where = timeSlots.length === 0 ? 'false' :
        `timeSlotId IN (${timeSlots.map(ts => ts.id).join(',')})`
      const query3 = `SELECT id, bookerId, timeSlotId, DATE_FORMAT(date, "%Y-%m-%d") as date from reservation WHERE ${where}`
      console.log(query3)
      connection.query(query3, (error, reservations) => {
        if (error) {
          return res.status(500).json({error: error.message})
        }
        console.log(reservations)
        res.json({
          markers: markers,
          timeSlots: timeSlots,
          city: city,
          reservations: reservations
        })
      })
    })
  })
})

//routes d'échange avec BDD
app.use("/api/clubs", clubs)
app.use("/api/users", users)
app.use("/api/resources", resources)
app.use("/api/timeslots",timeslots)
app.use("/api/bookings", bookings)

//erreur
app.use(function(req, res, next) {
  var  err  =  new  Error('Not Found')
  err.status  =  404
  next(err)
})

let  server  =  app.listen( process.env.PORT  ||  5000, function(){
  console.log('Listening on port http://localhost:5000/')
})

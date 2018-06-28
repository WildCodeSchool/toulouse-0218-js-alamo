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

app.use(morgan('dev'))
// Voir Benoit pour secret
app.use(session({ secret: "alamo", resave: true, saveUninitialized: true }))
app.use(bodyParser.urlencoded({ extended:  false }))
app.use(bodyParser.json())
app.use(express.static(__dirname  +  '/public'))

app.get("/", (req,res) => {
  res.send("youhou")
})

//routes d'échange avec BDD
app.use("/api/clubs", clubs)
app.use("/api/users", users)
app.use("/api/resources", resources)

//erreur
app.use(function(req, res, next) {
  var  err  =  new  Error('Not Found')
  err.status  =  404
  next(err)
})

let  server  =  app.listen( process.env.PORT  ||  5000, function(){
  console.log('Listening on port http://localhost:5000/')
})
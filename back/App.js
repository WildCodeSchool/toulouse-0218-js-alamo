const  http         =  require('http')
const  path         =  require('path')
const  express      =  require('express')
const  bodyParser   =  require('body-parser')
const  morgan       =  require('morgan')
const  app          =  express()
const  connection   =  require('./db.js');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended:  false }))
app.use(bodyParser.json())
app.use(express.static(__dirname  +  '/public'))

app.get('/api/cities',(req, res)=> {
    const search = req.query.search
    connection.query(`select ville_nom_reel as label From villes_france_free where ville_nom_reel LIKE '${search}%' limit 6`,(error, result)=>{
        if (error){
            return res.status(500).json([])
        }
        console.log(result['O'])
        res.json(result)
    })
   })

app.get("/", (req,res) => {
    res.send("youhou")
})

app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found')
    err.status  =  404
    next(err)
})

let  server  =  app.listen( process.env.PORT  ||  5000, function(){
    console.log('Listening on port http://localhost:5000/')
})
// La configuracion de expresss se crea en esta carpeta y se importa a index.js 

const expresss = require('express')
const bodyParser = require('body-parser')

const app = expresss()

// Settings
app.set('port', process.env.PORT || 3800)
// Middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Routes: cargando las rutas
const user_routes = require('./routes/user')

// Rutas

app.use('/api', user_routes)
// Exportar
module.exports = app
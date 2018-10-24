// La configuracion de expresss se crea en esta carpeta y se importa a index.js 

const expresss = require('express')
const bodyParser = require('body-parser')

const app = expresss()

// Settings
app.set('port', process.env.PORT || 3800)
// Middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Routes: rutas de prueba
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Accion de prueba de la ruta "home" en el servidor de NodeJS'
    })
})
app.get('/pruebas', (req, res) => {
    res.status(200).send({
        message: 'Accion de prueba de la ruta "pruebas" en el servidor de NodeJS'
    })
})


// Starting server

// Exportar
module.exports = app
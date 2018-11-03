'use strict'
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
const user_routes = require('./routes/user');
const comanda_routes = require('./routes/comanda');

// Rutas: congiracion de las rutas en app.
app.use('/api', user_routes);
app.use('/api', comanda_routes);

// Exportar
module.exports = app;
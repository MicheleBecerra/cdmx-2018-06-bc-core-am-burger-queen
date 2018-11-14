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

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

// Rutas: configuracion de las rutas en app.
app.use('/api', user_routes);
app.use('/api', comanda_routes);

// Exportar
module.exports = app;
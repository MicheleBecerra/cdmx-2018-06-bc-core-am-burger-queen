const express = require ('express')
const morgan = require('morgan')

const { mongoose } = require('./database')
// al ejecutar express te devuelve un objeto
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)
//Midlewares: 
app.use(morgan('dev'))
app.use(express.json())


// Routes
app.use('/api/menus', require('./routes/menu-routes'))


// Starting server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})

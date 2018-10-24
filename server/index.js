// se reqiere mongoose para trabajar la base de datos
const mongoose  = require ('mongoose')

const app = require('./app')


// Para conectarnos a la bd se hace con el método connect
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/cdmx-2018-06-bc-core-am-burger-queen', { useNewUrlParser: true })
.then(() => {
    console.log('La conexiòn a la base de datos de Burguer Queen se ha realizado correctamente')

    // Se crea el servidor : Se usa el método listen de express, el servidor escucha las peticiones.
    app.listen(app.get('port'), () => {
        console.log('Servidor esta corriendo en', app.get('port'))
      })


})

.catch(err => console.log(err))

// Se crea el servidor con express


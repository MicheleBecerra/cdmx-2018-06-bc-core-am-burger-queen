// Se carga el metodo de 
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')  // este modulo nos ayuda a cifrar la contraseña

function home(req, res) {
    res.status(200).send({
        message: 'Accion de prueba de la ruta "home" en el servidor de NodeJS'
    })
}
function pruebas(req, res) {
    res.status(200).send({
        message: 'Accion de prueba de la ruta "pruebas" en el servidor de NodeJS'
    })
}

function saveUser(req, res){
    const params = req.body   
    const user =new User(); 
    
    if(params.name && params.role && params.email && params.password && params.image){
        user.name = params.name,
        user.role = 'ROLE_USER',
        user.email = params.email,
        user.image = null

        // Se controla que no se dupliquen usuarios con el mismo correo o nombre y guarda los datos
        User.find({ $or: [
            {name: user.name.toLowerCase()},
            {email: user.email.toLowerCase()}     
        ]}).exec((err, users) => {
            if(err)
            return res.status(580).send({message: 'Error al cargar la peticion del usuario'}) 

            if(users && users.length >= 1){
                return res.status(200).send({ message: 'El usuaruario/correo ya se tiene registrado'})
            } else {
                // Aqui vamos a guardar la contraseña cifrada. LE va ahacer el encriptado y guarda el password en la bd
        bcrypt.hash( params.password, null, null, (err, hash) => {
            user.password = hash
            // Se guarda el registro del usuario
            user.save((err, userStored) => {
                if(err)
                return res.status(500).send({message: 'Error al guardar el usuario'})
                if (userStored){
                    res.status(200).send({user:userStored})
                } else {
                    res.status(400).send({ message: 'No se ha registrado al usuario'})
                }
            })
        })

    }
})

    } else {

        res.status(200).send({
            message: 'Envía todos los campos necesarios!!'
        })
    }

}

module.exports = {
    home,
    pruebas,
    saveUser,
}

// Se carga el metodo de 
const bcrypt = require('bcrypt-nodejs')  // este modulo nos ayuda a cifrar la contraseña
let mongoosePagination = require('mongoose-pagination');

const User = require('../models/user')
const jwt = require('../services/jwt')

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
    const params = req.body;
    const user =new User(); 
    
    if(params.name && params.role && params.email && params.password && params.image){
        user.name = params.name,
        user.role = params.role,
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

function loginUser (req, res){
    const params = req.body;

    const email = params.email;
    const password = params.password;

    User.findOne({ email:email }, (err, user) => {
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        
        if(user){
            bcrypt.compare(password, user.password, (err, check) => {
                if(check){
                    if (params.gettoken){
                        // Si es true devolver token .Si no, se genera el token para usuario.
                        return res.status(200).send({
                          token: jwt.createToken(user)
                        })
                         
                    }else {
                    // devolver datos del usuario
                    user.password = undefined;
                    return res.status(200).send({user});
                    }

                } else {
                    return res.status(404).send({message: 'El usuario no se ha podido identificar'});
                }
            })
        }else{
            return res.status(404).send({message: 'El usuario no se ha podido identificar!!!'});
        }
    })
}
// Obtenr los datos del usuario: id del usuario llega por la url y se utiliza el metodo req.params

function getUser(req, res) {
 let userId = req.params.id;

     User.findById(userId, (err, user) => {
     if(err) return res.status(500).send({message:'El usuario no existe'});
     if(!user) return res.status(404).send({message: 'Error en la peticion'});
     return res.status(200).send({user});
 });
}
// Devolver un listado de las comandas por usuario
function getCajeras(req, res){
    const identity_user_id = req.user.sub;

    let page = 1 ;
    if (req.params.page){
        page = req.params.page;
    }

    let itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, cajeras, total) => {
        if(err) return res.status(500).send({message:'Error en la petición'})
        if(!cajeras) return res.status(500).send({message: 'No hay usuarios disponibles'});
        return res.status(200).send({
            cajeras, 
            total,
            pages: Math.ceil(total/itemsPerPage)
        })
    })
}
// Editar datos del usuario
function updateUser(req, res){
    const userId = req.params.id;
    const update = req.body;
    // Borrar pasword
    delete update.password;
    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para actualizar los datos'})
    }
    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
        if(err) return res.status(500).send({message:'Error en la petición'});

        if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
        
        return res.status(200).send({user: userUpdated});
    });
}
module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser, 
    getUser,
    getCajeras,
    updateUser
}

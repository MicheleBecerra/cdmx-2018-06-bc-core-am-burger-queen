const fs = require('fs');
const psth =require('path')

const User = require('../models/user')

// Se carga el modulo de bcryp para encriptar la constraseña
const jwt = require('../services/jwt')
const bcrypt = require('bcrypt-nodejs')  
let mongoosePaginate = require('mongoose-pagination')


//Metodos de prueba
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

// Funcion para registrar al usuario
function saveUser(req, res){
    const params = req.body;
    const user =new User(); 
    console.log(req.body);
    
    
    if(params.name && params.role && params.email && params.password){
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
            return res.status(500).send({message: 'Error al cargar la peticion del usuario'}) 

            if(users && users.length >= 1){
                return res.status(200).send({ message: 'El usuaruario/correo ya se tiene registrado'})
            } else {
                // Aqui vamos a guardar la contraseña cifrada. Le va a hacer el encriptado y guarda el password en la bd
        bcrypt.hash( params.password, null, null, (err, hash) => {
            user.password = hash
            // Se guarda el registro del usuario
            user.save((err, userStored) => {
                if(err)
                return res.status(500).send({message: 'Error al guardar el usuario'})
                if (userStored){
                    res.status(200).send({user:userStored})
                } else {
                    res.status(404).send({ message: 'No se ha registrado al usuario'})
                }
            })
        })

    }
})

    } else {
        res.status(200).send({
            message: 'Por favor llena todos los campos necesarios!!'
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
    });
}
// Obtenr los datos del usuario: id del usuario llega por la url y se utiliza el metodo req.params

function getUser(req, res) {
 let userId = req.params.id;

     User.findById(userId, (err, user) => {
     if(err) return res.status(500).send({message: 'Error en la peticion'});
     if(!user) return res.status(404).send({message: 'El usuario no existe' });
     return res.status(200).send({user});
 });
}
// Devolver un listado de las comandas por usuario
function getCajeras(req, res){

    let identity_user_id = req.user.sub;
    
    let page = 1 ;
    if (req.params.page){
        page = req.params.page;
    }
    // console.log(body.req);
    let itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, cajeras, total) => {
        if(err) return res.status(500).send({message:'Error en la petición'})
        if(!cajeras) return res.status(404).send({message: 'No hay usuarios disponibles'});
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
    // console.log(update);
    
    // Borrar pasword
    delete update.password;
    // Se evita que un usuario actualice datos de otro usuario
    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para actualizar los datos'})
    }

    User.find({ $or : [
        {email: update.email.toLowerCase()},
        {name: update.name.toLowerCase()}
    ]}).exec((err, cajeras) => {
        const user_isset = false ;
        cajeras.forEach((user) => {
            if(user && user._id != userId) user_isset = true
        })
    if(user_isset) return res.status(404).send({message:'Los datos ya estan registrados'})

    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
        if(err) return res.status(500).send({message:'Error en la petición'});

        if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
        
        return res.status(200).send({user: userUpdated});
    })
  })
}
// Subir archivo de imagen de usuario - cajera

function uploadImage(req, res) {
    const userId = req.params.id;
    
    // if(userId != req.user.sub){
    //     return res.status(500).send({message: 'No tienes permiso para actualizar los datos'})
    // }
    if(req.files){
        let file_path = req.files.image.path;
        console.log(file_path); 
             
        let file_split = file_path.split('\\');
        console.log(4 ,file_split);
        
        let file_name = file_split[2];
        console.log(3 , file_name);

        let ext_split = file_name.split('\.');
        console.log(2 , ext_split);
        
        let file_ext = ext_split[1];
        console.log(1 , file_ext);

        if(userId != req.user.sub){
           return removeFilesOfUpload(res, file_path,'No tienes permiso para actualizar los datos');
        }
        if(file_ext == 'png'|| file_ext == 'jpg' || file_ext == 'gif'){
            // Actualiza documento de usuario logeado
            User.findByIdAndUpdate(userId, {image: file_name}, {new:true}, (err, userUpdated) => {

                if(err) return res.status(500).send({message:'Error en la petición'});

                if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
        
                return res.status(200).send({user: userUpdated});
            });

        } else {
            return removeFilesOfUpload(res, file_path, 'Extensión no válida');
        }
    } else { 
        return res.status(200).send({message: 'No se han subido archivos de imagen'});
        }
    }


function removeFilesOfUpload(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({message: message});
    });
}

function getImageFile(req, res){
    const image_file = req.params.imageFile ;
    const path_file = './uploads/users/' + image_file;
    console.log( 6 , path_file);

    fs.exists(path_file, (exists) => {
        
        if(exists){
            res.sendFile(path.resolve(path_file))
        
        
        }else{
            res.status(200).send({message: 'No existe la imagen ...'})
        }        
    })
}

module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser, 
    getUser,
    getCajeras,
    updateUser,
    uploadImage,
    getImageFile
    
}

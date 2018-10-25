const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_burguer_queen_offline';

// Se usa como metodo del middleware ensure, el middleware, va recibir como paarametro req, res y next. Hasta que se ejecute next se va a ejecutar el metodo de la ruta que se esta llamando 
exports.ensureAuth = (req, res, next) => {
    
    if(!req.headers.authorization){
        return res.status(403).send({ message:'La peticion no tienen la cabecera de autenticacion'});
    }

    // Se va a decodificar el token usando el metodo decode y la clave secreta. El payload se introducira en un try-catch para que si existe un problema en la petición cache el error y lo muestre.
    const token = req.headers.authorization.replace(/['"]+/g, '');
    
    try{ 
        let payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message:'El token ha expirado'
            })
        }
    } catch(ex){
        return res.status(404).send({
            message:'El token no es valido'
        })
    }
    // Se iguala payload al req para que siempre este ligado el usuario logeado a los controladores
    req.user = jwt.decode(token, secret);
    next();
}

// Sew genera un token

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_burguer_queen_offline';

exports.createToken = function (user){
    const payload = {
        sub: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }
    return jwt.encode(payload, secret);
}

    
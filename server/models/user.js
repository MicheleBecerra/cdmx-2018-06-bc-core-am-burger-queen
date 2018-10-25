// Se usa mongoose  para usar los metodos de mongoose y se usa Schema para darle estructura al objeto usuario

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    name: String, 
    role: String,
    email: String,
    password: String,
    image: String
})
// Se usa el metodo model de mongoose y se le indica el nombre de la entidad y el nombre del esquema que le dará forma al objeto

module.exports = mongoose.model('User', userSchema) 
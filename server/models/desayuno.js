// Se usa mongoose  para usar los metodos de mongoose y se usa Schema para darle estructura al objeto desayuno

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const desayunoSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User'},
    platillos:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Desayuno', desayunoSchema)

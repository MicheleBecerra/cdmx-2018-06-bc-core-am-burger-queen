// Se usa mongoose  para usar los metodos de mongoose y se usa Schema para darle estructura al objeto bebidas

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bebidaSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User'},
    bebida:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Bebida', bebidaSchema)
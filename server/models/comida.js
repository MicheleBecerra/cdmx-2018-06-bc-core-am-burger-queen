// Se usa mongoose  para usar los metodos de mongoose y se usa Schema para darle estructura al objeto comida

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comidaSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User'},
    platillos:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }, 
    side:{
        type: String,
    },
    priceSide:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Comida', comidaSchema)
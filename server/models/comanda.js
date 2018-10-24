// Se crea el esquema de la comanda que tomara el cajero del Burguer Queen

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comandaSchema = Schema({
    cajera:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref:'User'
    },
    desayuno:{
        type:[mongoose.Schema.Types.ObjectId],
        required: true,
        ref:'Desayuno'
    },
    comida:{
        type:[mongoose.Schema.Types.ObjectId],
        required: true,
        ref:'Comida'
    },
    bebida:{
        type: String,
        required: true,
        ref:'Bebida'
    },
    total:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Comanda', comandaSchema)
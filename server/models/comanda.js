// Se crea el esquema de la comanda que tomara el cajero del Burguer Queen

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comandaSchema = Schema({
    
    text: {type: String},
    user: {type: Schema.ObjectId, ref:'User' },
    desayuno: { type: String },
    comida: { type: String},
    bebida: { type: String},
    total: { type: Number},
    file: {type: String},
    created_at: {type: String}
})

module.exports = mongoose.model('Comanda', comandaSchema)
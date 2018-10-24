const mongoose = require('mongoose')
const { Schema } = mongoose

const comandaSchema = new Schema({
  name: { type: String, required: true },
  desayuno: { type: String, required: true },
  comida: { type: String, required: true },
  resumenComanda: { type: String, required: true }
})

module.exports = mongoose.model('Comanda', comandaSchema)
'user strict'
const path =require('path');
const fs  = require('fs');

const moment = require('moment')
const mongoosePaginate = require('mongoose-pagination');

const Comanda = require('../models/comanda');
const User = require('../models/user')

// const Desayuno = require('../models/desayuno');
// const Comida = require('../models/comida');
// const Bebida = require('../models/bebida');


function probando(req, res){
    res.status(200).send({
      message: 'Hola desde el controlador de publicación de comandas'  
    })
}

module.exports = {
    probando
}
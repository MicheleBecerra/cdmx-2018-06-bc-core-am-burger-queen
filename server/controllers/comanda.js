'user strict'
const path = require('path');
const fs  = require('fs');

const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');

const Comanda = require('../models/comanda');
const User = require('../models/user')

// const Desayuno = require('../models/desayuno');
// const Comida = require('../models/comida');
// const Bebida = require('../models/bebida');

function probando(req, res){
    res.status(200).send({
      message: 'Hola desde el controlador de publicación de comandas'  
    });
}

function saveComanda(req, res){
    const params = req.body;

    if(!params.text) return res.status(200).send({message: 'Debes enviar un texto !!'});

    const comanda = new Comanda();
    comanda.text = params.text;
    comanda.user = req.user.sub;
    comanda.desayuno = params.desayuno;
    comanda.comida = params.comida;
    comanda.bebida = params.comida;
    comanda.total = params.total;
    comanda.file = 'null'
    comanda.created_at = moment().unix();
     
    comanda.save((err, comandaStored) => {
        if(err) return res.status(500).send(({message: 'Error al guardar la comanda'}));

        if(!comandaStored) return res.status(404).send({ message: 'La comanda NO ha sido guardada'});

        return res.status(200).send({comanda: comandaStored});
    })
}

function getComanda(req, res){
    const comandaId = req.params.id;

    Comanda.findById(comandaId, (err, comanda) => {
        if (err)
        return res.status(500).send({
            message: 'Error al devolver la comanda'});
        if(!comanda) return res.status(400).send({ message: 'No existe la comanda que busca'});
        
        return res.status(200).send({comanda});
    });
}
function deleteComanda (req, res){
    const comandaId = req.params.id;

    Comanda.find({'user': req.user.sub, '_id': comandaId}).remove((err, comandaRemoved) => {
        if (err)
        return res.status(500).send({
            message: 'Error al borrar la comanda'});
        if(!comandaRemoved) return res.status(400).send({ message: 'No se ha borrado la comanda'});
        
        return res.status(200).send({message: 'La comanda se ha borrado correctamente'});
    })
}

module.exports = {
    probando, 
    saveComanda,
    getComanda,
    deleteComanda
}

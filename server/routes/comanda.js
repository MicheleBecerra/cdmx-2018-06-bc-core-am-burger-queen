'use strict'

const express =  require('express');
const ComandaController = require('../controllers/comanda');

const api = express.Router();
const md_auth = require ('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/comandas'});

// Defino la ruta hacia el metodo comanda.js 
api.get('/probando-pub', md_auth.ensureAuth, ComandaController.probando);
api.post('/comanda', md_auth.ensureAuth, ComandaController.saveComanda);
api.get('/comanda/:id', md_auth.ensureAuth, ComandaController.getComanda);
api.delete('/comanda/:id', md_auth.ensureAuth, ComandaController.deleteComanda);

module.exports = api;

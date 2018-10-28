'use strict'

const express =  require('express');

const ComandaController = require('../controllers/comanda');
const api = express.Router();
const md_auth = require ('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: '../uploads/comandas'});

api.get('./probando', md_auth.ensureAuth, ComandaController.probando);

module.exports = api;

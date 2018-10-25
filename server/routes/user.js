const express = require('express')
const UserController = require('../controllers/user')

const api = express.Router()

api.get('/home', UserController.home)
api.get('/pruebas', UserController.pruebas)
api.post('/register', UserController.saveUser)
api.post('/loginUser', UserController.loginUser)

module.exports= api
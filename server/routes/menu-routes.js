const express = require('express')
const router = express.Router()
const menuCtrl = require('../controllers/menu-controller')

router.get('/', menuCtrl.getComanda)
router.post('/', menuCtrl.createComanda)
router.get('/:id', menuCtrl.getComanda)
router.put('/:id', )
module.exports = router
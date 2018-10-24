const express = require('express')
const router = express.Router()
const menuCtrl = require('../controllers/menu-controller')

router.get('/', menuCtrl.getComandas)
router.post('/', menuCtrl.createComanda)
router.get('/:id', menuCtrl.getComanda)
router.put('/:id', menuCtrl.editComanda)
router.delete('/:id', menuCtrl.deleteComanda
)

module.exports = router

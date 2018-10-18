const comandaCtrl = {}

comandaCtrl.getComanda = (req, res) => { 
    res.json({
      status: 'Las comandas van aquí'
    })
  }

comandaCtrl.createComanda = function () {

}

module.exports = comandaCtrl

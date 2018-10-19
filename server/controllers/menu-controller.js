// Se van a definir las consultas a la base de datos, ya que las funciones son las que mandan las consultas
const comanda = require('../models/menu')

const comandaCtrl = {}

// Asyn nos anuncia que es una funcion asincoronica y que se tiene que esperar a que llegue la respuesta de la base de datos y despues los guarda en una constante llamada coamndas
comandaCtrl.getComandas = async (req, res) => {
  const Comandas = await comanda.find()
  res.json(Comandas)
  // console.log(comandas)
  
}

comandaCtrl.createComanda = async (req, res) => {
  const Comanda = new comanda (req.body)
  await Comanda.save()
  console.log(Comanda)
  res.json({
      'status': 'Comanda almacenada'
  })
}

comandaCtrl.getComanda = function () {

}

comandaCtrl.editComanda = function () {

} 

comandaCtrl.deleteComanda = function () {

}

module.exports = comandaCtrl

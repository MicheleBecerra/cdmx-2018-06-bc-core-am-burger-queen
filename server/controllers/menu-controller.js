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
  // console.log(Comanda)
  res.json({
    'status': 'Comanda almacenada'
  })
}

comandaCtrl.getComanda = async (req, res) => {
  // console.log(req.params.id)
  const Comanda = await comanda.findById(req.params.id)
  res.json(Comanda)
}

comandaCtrl.editComanda = async (req, res) => {
  const { id } = req.params
  const Comanda = {
    name: req.body.name,
    desayuno: req.body.desayuno,
    comida: req.body.comida,
    resumenComanda: req.body.resumenComanda
  }
  console.log(Comanda); 
  await comanda.findByIdAndUpdate(id, {$set: Comanda}, {new: true})
  res.json({status: 'Comanda Actualizada'})
}

comandaCtrl.deleteComanda = async (req, res) => {
  await comanda.findByIdAndRemove(req.params.id)
  res.json({ status: 'Comanda Eliminada'})
}

module.exports = comandaCtrl

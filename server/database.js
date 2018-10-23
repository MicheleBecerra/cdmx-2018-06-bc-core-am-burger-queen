const mongoose = require('mongoose')

const URI = 'mongodb://localhost/burguer-queen'

mongoose.connect(URI)
  .then(db => console.log('DB is connected'))
  .then(err => console.log(err))

module.exports = mongoose

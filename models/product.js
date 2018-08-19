'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const ProductSchema = Schema({
  nombre: String,
  modelo: String,
  precio : {type: Number, default: 0},
  estado: String,
  descripcion: String
})

module.exports = mongoose.model('Product', ProductSchema)
'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
// `...`

app.get('/api/product' ,(req,res) => {
   Product.find({} , (err, products) => {
    if (err) return res.status(500).send({ message:` Error al realizar la peticion: ${err}`})
    if(!products) return res.status(404).send({message: `No existen productos`})
    res.send(200, {products })
   })
})
app.get('/api/product/:productId' , (req,res) => {
    let productId = req.params.productId
    Product.findById(productId, (err, product) =>{
        if (err) return res.status(500).send({ message:` Error al realizar la peticion: ${err}`})
        if(!product) return res.status(404).send({message: `El producto no existe`})

        res.status(200).send({product: product})
    })
})

//CRUD


app.post('/api/product' , (req, res) => {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.nombre = req.body.nombre
  product.modelo = req.body.modelo
  product.precio = req.body.precio
  product.estado = req.body.estado
  product.descripcion = req.body.descripcion

  product.save((err, productStored) => {
      if (err) res.status(500).send({ message:  `error al salvar en la base de datos: ${err}`})
        res.status(200).send({product: productStored})
    })

})

app.put('/api/product/:productId' , (req,res) => {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({ message:  `error al actualizar producto: ${err}`})

        res.status(200).send({ product: productUpdated})
    })
})

app.delete('/api/product/:productId' , (req,res) => {
    let productId = req.params.productId

    Product.findById(productId , (err, product) => {
        if(err) res.status(500).send({message:`Error al borrar el product: ${err}` })

        product.remove(err => {
            if(err) res.status(500).send({message: `Error al borar el producto: ${err}`})
            res.status(200).send({message: 'el producto ha sido eliminado'})
        })
    })
})

mongoose.connect("mongodb://localhost:27017/ventacelulares" ,{ useNewUrlParser: true }, (err, res) => {
    if (err) throw err
    console.log('Conexion a la DB establecida')
    app.listen(port, () => {
      console.log(`API REST corriendo en http://localhost:${port}`)
    })
  })

  //"mongoose": "3.0"
  //"mongoose": "^4.10.8"


  ///////////////////////

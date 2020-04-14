require("./config/config")

const express = require('express')
const mongoose = require('mongoose');

//Inicializar o cargar el express
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Configuracion global de rutas
app.use(require('./routes/index'))


//Conexion a la BD(mongoDB)
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, }, (err, res) => {
    if (err) throw err
    console.log(`Conexion exitosa!`)
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchamdo puerto ${process.env.PORT}`)
})
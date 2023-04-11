const express = require('express');
const app = express();
const {logger} = require('morgan')
//instalar express
//instalar morgan
// y agregar el start al json con el nodemon

const allRoutes = require('./../routes/index')

app.use(express.json())

//para recibir datos de formularios
const urlecoded = express.urlencoded({extended:false})

//middlewares de acceso
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
})

app.use('/rickandmorty', allRoutes)
//exportas para el servidor

app.get('/',(req,res)=>{
    res.status(200).json({saludos:"kathe"})
})
module.exports = app
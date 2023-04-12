const express = require('express');
const app = express();
const logger = require('morgan')
//instalar express
//instalar morgan
// y agregar el start al json con el nodemon

const allRoutes = require('./../routes/index')

app.use(express.json())

//para recibir datos de formularios
const urlecoded = express.urlencoded({extended:false})

//middlewares de acceso
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*"); //Autorizo recibir solicitudes de este dominio
    res.header("Access-Control-Allow-Credentials", true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    ); //Autorizo recibir solicitudes con dichos hedears
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
    next();
})

app.use(logger('dev'))

app.use('/rickandmorty', allRoutes)
//exportas para el servidor

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "in first server in EXPRESS", 
        app: "BUCARAMANGA"
    })
})
module.exports = app
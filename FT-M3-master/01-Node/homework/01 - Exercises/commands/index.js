const fs = require("fs");//core de node
const utils = require("../utils/request");
const process = require("process");
const { error } = require("console");

function pwd(print) {
    print(process.cwd())
    //imprime en pantalla el directorio donde esta parado
}

function date(print) {
    print(Date())
    //imprime la fecha
}

function echo(print ,args) {
    print(args)
    //imprime el argumento con la data
}

function ls(print) {
    //      ubicacion   fc que manera el error y la data
    fs.readdir(".", function(error,files){
        if(error) throw new Error(error)
        print(files.join(" "))
    })
    //lee todos los archivos y carpetas que se encuentran en un directorio
}

function cat(print ,args) {
    //para leer un archivo
    //         ubicacion-buffer-fc que manera el error y la data
    fs.readFile(args,'utf-8',(error,data)=>{
        if(error) throw new Error(error)
        print(data)
    })
    //lee que tiene dentro del archivo
}

function head(print ,args) {
    fs.readFile(args,'utf-8',(error,data)=>{
        if(error) throw new Error(error)
        const line = data.split("\n")[0].trim()
        //separa la primera linea
        print(line)
    })
    //muesta toda la info del head
}

function tail(print ,args) {
    fs.readFile(args,'utf-8',(error,data)=>{
        if(error) throw new Error(error)
        const line = data.split("\n")
        //separa la ultima linea
        print(line[line.length-1].trim())
    })
    //muesta toda la info que esta de bajo del head
}

function curl(print ,args) {
    utils.request(args, (error,response)=>{
        if(error) return new Error(error)
        print(response)
    })
    //es como una peticion
}

module.exports = {pwd, date, curl, echo, ls, cat, head, tail};








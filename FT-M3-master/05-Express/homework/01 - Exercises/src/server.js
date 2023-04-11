const express = require("express");

let publications = [];

const STATUS_ERROR = 404
const STATUS_OK = 200
let id = 0

const server = express();

server.use(express.json());

server.get("/posts", (req,res)=>{
    const { author, title, contents} = req.body
    if (!author || !title || !contents) {
        return res
        .status(STATUS_ERROR)
        .json({
            error: "No se recibieron los parámetros necesarios para crear la publicación"
        })
    }
    const publication = {
        author,
        title,
        contents,
        id: ++id
    }
    publications.push(publication)
    res.status(STATUS_OK).json(publication)
})

server.get('/posts', (req,res)=>{
    const { author, title } = req.query
    if (author && title) {
        const filterPublications = publications.filter(p=>{
            return p.title === title && p.author === author
        })
        filterPublications.length > 0 
            ? res.status(STATUS_OK).json(filterPublications)
            : res.status(STATUS_ERROR).json({error: "No existe ninguna publicación con dicho título y autor indicado"})
    }else {
        res
        .status(STATUS_OK)
        .json({mesage:"all publicacions",publication: publications})
    }
})

server.get("/posts/:author", (req,res)=>{
    const { author } = req.params
    if (author) {
        const filterPublications = publications.filter(p=>{
            return p.author === author
        })
        filterPublications.length > 0 
            ? res.status(STATUS_OK).json(filterPublications)
            : res.status(STATUS_ERROR).json({error: "No existe ninguna publicación del autor indicado"})
    }else {
        res
        .status(STATUS_ERROR)
        .json({mesage:"autor not validated"})
    }
})

server.put('/posts/:id', (req,res)=>{
    const { id } = req.params
    const { title, contents } = req.body
    if (!id || !title || !contents) {
        return res
        .status(STATUS_ERROR)
        .json({
            error: "No se recibieron los parámetros necesarios para modificar la publicación"
        })
    }
    const publicId = publications.fin(e=> e.id === Number(id))
    if (!publicId) {
        res.status(STATUS_ERROR).json({error: "No se recibió el id correcto necesario para modificar la publicación"})
    }
    publicId = {...publicId, title , contents}

    publications.forEach((e,i)=>{
        if(e.id === Number(id)){
            publications[i] = publicId
        }
    })
    res.status(STATUS_OK).json(publicId)
})

server.delete('/posts/:id', (req,res)=>{
    const { id } = req.params
    if (!id) {
        return res
        .status(STATUS_ERROR)
        .json({error: "No se recibió el id de la publicación a eliminar"})
    }
    const newPublication = publications.filter(e=>e.id !== Number(id))
    if(newPublication.length < publications.length){
        publications= newPublication
        return res.status(STATUS_OK).json({ success: true })
    }
    return res
        .status(STATUS_ERROR)
        .json({error: "No se recibió el id correcto necesario para eliminar la publicación"})
})


//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };

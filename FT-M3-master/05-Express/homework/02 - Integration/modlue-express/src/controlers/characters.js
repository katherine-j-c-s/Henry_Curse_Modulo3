const axios = require('axios')

require('dotenv').config()

const URL = process.env.API_URL

const STATUS_OK = 200
const STATUS_ERROR = 404

function getCharById(req,res){
    const {id} = req.params
    try {
        axios.get(`${URL}${id}`)
        .then(({data})=>{
            if(data){
                const character = {
                    id: data.id,
                    status: data.status,
                    name: data.name,
                    species: data.species,
                    origin: data.origin.name,
                    image: data.image,
                    gender: data.gender
                }
                res.status(STATUS_OK).json(character)
            }
            else{
                res.status(STATUS_ERROR).json({message:"character not found"})
            }
        });    
    } catch (error) {
        res.status(500).json({ message:error })
    }
}

function getAllChar(req,res){
    try {
        axios.get(`${URL}`)
        .then(({data})=>{
            if(data){
                const characters = data.filter((data)=>{
                    const character = {
                    id: data.id,
                    status: data.status,
                    name: data.name,
                    species: data.species,
                    origin: data.origin.name,
                    image: data.image,
                    gender: data.gender
                    }
                    return character
                });
                res.status(STATUS_OK).json(characters)
            }
            else{
                res.status(STATUS_ERROR).json({ message:"character not found" })
            }
        });    
    } catch (error) {
        res.status(500).json({ message:error })
    }
}
module.exports = {
    getCharById,
    getAllChar
}
import mongoose from 'mongoose'
import UserModel from "../models/users.js"

const pokemonSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Pas de nom"]
    },
    level: {
        type: Number,
        required: [true, "Pas de level"]
    },
    type: {
        type: String,
        required: [true, "pas de type"]
    },
    trainer: {

        type: String,
        required: [true, "pas de dresseur"]
    },
    //multer - ajout de l'attribut img (***** image *****)
    img: {
        type: String,
        default: "pikachu.png"
    },
})

const pokemonModel = mongoose.model('pokemons', pokemonSchema)
export default pokemonModel
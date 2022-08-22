import UserModel from "../models/users.js"
import pokemonModel from "../models/pokemons.js"
import fs from 'fs'

export class pokemonController {
    static async getPokemons(req) {
        let pokemons = await pokemonModel.find({ trainer: req.session.user })
        return pokemons
    }

    static async addPokemons(req) {
        console.log(req.file);
        req.body.trainer = await req.session.user
        //multer (***** image *****)
        req.body.img = req.file.filename;
        //multer (***** image *****)
        let pokemon = new pokemonModel(req.body)
        await pokemon.save()
        return pokemon
    }

    static async updatePokemons(req) {
        req.body.trainer = await req.session.user
        //multer (***** image *****)
        if (req.file) {
            let pokemon = await pokemonModel.findOne({_id: req.params.id})
            let imgName = pokemon.img
            let imgDir = "assets/uploads/images/"
            fs.unlinkSync(imgDir + imgName)
            req.body.img = req.file.filename;
        }
        //multer (***** image *****)

        let updateStates = await pokemonModel.updateOne({_id: req.params.id},req.body)
        return updateStates
    }

}

export default pokemonController




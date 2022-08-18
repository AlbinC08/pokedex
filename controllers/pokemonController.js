import UserModel from "../models/users.js"
import pokemonModel from "../models/pokemons.js"

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


}

export default pokemonController




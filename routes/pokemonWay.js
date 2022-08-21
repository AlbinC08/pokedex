import pokemonModel from '../models/pokemons.js'
import { Router } from 'express'
import authGuard from '../authGuard.js'
import pokemonController from '../controllers/pokemonController.js'
import multer from "multer";

const pokemonRouter = Router()

// debut multer (***** image *****)
//image
const storage = multer.diskStorage({
  // destination pour le fichier
  destination:function(req,file,callback){
    callback(null,'./assets/uploads/images' )
  },
  //ajouter le retour de l'extension
  filename:function (req,file,callback) {
    callback(null,Date.now() + file.originalname)//date d'aujourd'hui concaténé au nom de l'image
  },
})

//upload parametre pour multer
const upload = multer({
  storage:storage,
  limits:{
    fieldSize:1024*1024*3,
  },
})

// fin multer (***** image *****)

  


/***********Ajouter un pokemon*************/
//multer -  ajouter "upload.single('image')" (***** image *****)
pokemonRouter.post('/addPokemon',upload.single('image'), async (req, res) => {
  try {
    console.log(req.file);
    let pokemon = await pokemonController.addPokemons(req)
    console.log(pokemon);
    res.redirect('/index')        /*******affiche la page principal après l'ajout de pokemon en passant par la route index*******/
  } catch (error) {
    console.log(error);
  }
})

/***********Afficher la page d'ajout d'un pokemon*************/

pokemonRouter.get('/displayAddPokemon', authGuard , async (req, res) => {
  try {
    res.render('addPokemon.twig', {            /*******affiche la page d'ajout d'un pokemon*******/
    })
  } catch (error) {
    console.log(error);
  }
})

/***********Afficher la page pour Modifier un pokemon*************/

pokemonRouter.get('/displayUpdatePokemon/:id', authGuard , async (req, res) => {
  try {
    let pokemon = await pokemonModel.findOne({ _id: req.params.id })
    res.render('updatePokemon.twig',{ pokemon: pokemon })      /*******affiche la page de modification d'un pokemon*******/
      
  } catch (error) {
    console.log(error);
  }
})

/***************************Modifier un pokemon*******************************/

pokemonRouter.post('/updatePokemon/:id',upload.single('image'), async (req, res) => {
  try {
    console.log(req.file);

    await pokemonModel.updateOne({ _id: req.params.id }, req.body)
    res.redirect('/index')        /*******affiche la page principal après la modification du pokemon en passant par la route index*******/
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

/***************************Supprimer un pokemon*******************************/

pokemonRouter.get('/deletePokemon/:id', async (req, res) => {
  try {
    await pokemonModel.deleteOne({ _id: req.params.id })
    res.redirect('/index')        /*******affiche la page principal après la suppression du pokemon en passant par la route index*******/
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})




export default pokemonRouter

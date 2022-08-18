import { Router } from 'express'
import UserModel from "../models/users.js"
import pokemonModel from '../models/pokemons.js'
import userController from '../controllers/userController.js'
import authGuard from '../authGuard.js'
import {cryptPassword, comparePassword} from '../bcrypt.js'
import pokemonController from '../controllers/pokemonController.js'

const userRouter = Router()



/***********Afficher la page d'inscription*************/

userRouter.get('/addUser', async (req, res) => {
  try {
    res.render('inscription.twig') /*******afficher la page d'inscription*******/
  } catch (error) {
    console.log(error);
  }
})

/***********Afficher la page d'Acceuil*************/

userRouter.get('/index', authGuard, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.session.user })
    

    let pokemons = await pokemonController.getPokemons(req)
    res.render('index.twig', {      /*******afficher la page d'accueil*******/
      pokemons: pokemons,
      user: user
    })
  } catch (error) {
    console.log(error);
  }
})

/***********Ajouter un utilisateur*************/

userRouter.post('/addUser', async (req, res) => {
  try {
    let user = await userController.subscribe(req)
    res.redirect('/index')        /*******afficher la page principal après l'inscription en passant par la route index*******/
  } catch (error) {
    console.log(error);
  }
})

/***********Afficher la page de connexion*************/

userRouter.get('/', async (req, res) => {
  try {
    let error = ""
    if (req.session.error) {            /***********si la connection echoue*************/
      error = req.session.error       /***********la variable error = req.session.error = "vous n'etes pas connecté"*************/
      req.session.error = ""
    }
    res.render('login.twig', {
      error: error
    })
  } catch (error) {
    console.log(error);
  }
})

/***********Se connecter*************/

userRouter.post('/loginUser', async (req, res) => {
  let user = await userController.login(req)
  if (user) {
    req.session.user = user._id
    res.redirect('/index')
  } else {
    req.session.error = "vous n'etes pas connecté"
    res.redirect("/")
  }
})

/***********Se déconnecter*************/

userRouter.get('/logout', async (req, res) => {

  req.session.destroy()


  res.redirect('/')
})

export default userRouter
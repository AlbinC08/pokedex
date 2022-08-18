
import UserModel from './models/users.js';

let authGuard = async function  (req,res,next) {
    let user = await UserModel.findOne({_id: req.session.user})
   if (user) {
    next()
   }else{
    res.redirect('/')
   } 
} 

export default authGuard
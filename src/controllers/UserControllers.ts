import User from "../models/User"
import { validationResult } from "express-validator";

export class UserController {

   static async register(req,res){

    let errors = validationResult(req)
    let email = req.body.email; 
    let password = req.body.password;

    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }

    try {

      let user = await User.create({
        email: email, 
        password: password
      })
  
      res.status(200).json(user)
    } catch (error) {
      res.json({err: error.message})
    }

  }

}
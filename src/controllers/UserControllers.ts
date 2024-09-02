import User from "../models/User"
import { validationResult } from "express-validator";

export class UserController {

   static register(req, res, next){

    const errors = validationResult(req)
    const name = req.body.name;
    const email = req.body.email; 
    const phone = req.body.phone; 
    const password = req.body.password;
    const type = req.body.type;
    const status = req.body.status;

    if(!errors.isEmpty()){
      next(new Error(errors.array()[0].msg))
    }

    const data = {
      name,
      email, 
      phone,
      password, 
      type, 
      status
    }

    let user = new User(data)

    user.save()
      .then(user => res.send(user))
      .catch(err => next(err))
  
  }
}
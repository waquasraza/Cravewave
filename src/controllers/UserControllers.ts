import User from "../models/User"
import { Utils } from "../utils/Utils";

export class UserController {

   static async register(req, res, next){
    const name = req.body.name;
    const email = req.body.email; 
    const phone = req.body.phone; 
    const password = req.body.password;
    const type = req.body.type;
    const status = req.body.status;

    const data = {
      name,
      email, 
      varification_token: Utils.generateVarificationToken(),
      varification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
      phone,
      password, 
      type, 
      status
    }

    try {
      let user = await new User(data).save()
      // send email to user varification
      res.send(user)
    } catch (error) {
      next(error)
    }
  }

  static async verify(req, res, next){
    const varification_token = req.body.varification_token; 
    const email = req.body.email; 
    try {
      const user = await User.findOneAndUpdate(
        {
        email,
        varification_token: varification_token,
        varification_token_time: {$gt: Date.now()}
        },
        {
          email_varified: true
        },
        {
          new: true
        }
    )
      if(user){
        res.send(user)
      }else{
        throw new Error('Email varification token is expired. Please try again...')
      }
    } catch (error) {
      next(error)
    }
  }

}
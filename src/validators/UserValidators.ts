import { body } from "express-validator";
import User from "../models/User";

export class UserValidators {
  static register (){
    return [ 
      body('name', 'Name is required').isString(),
      body('email', 'Email is required').isEmail().custom((email, {req})=>{
        return User.findOne({email}).then((user)=>{
          if(user) throw new Error('User already exists') 
          else return true
        }).catch((e) => {
          throw new Error('User already exists') 
        })
      }),
      body('phone', 'Phone Number is required').isString(),
      body('password', 'Password is required').isStrongPassword()
        .isLength({min: 6, max: 25})
        .withMessage('Password must be between 8 - 20 characters'),
      body('type', 'User role type is required').isString(),
      body('status', 'User status is required').isString(),
    ]
  }

  static verifyUserEmail (){
    return [ 
      body('varification_token', 'Email varification token is required').isNumeric(),
      body('email', 'Email is required').isEmail(),
    ]
  }
}
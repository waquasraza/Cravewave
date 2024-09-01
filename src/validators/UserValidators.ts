import { body, validationResult } from "express-validator";

export class UserValidators {
  static register (){
    return [ 
      body('email', 'Email is required').isEmail(),
      body('password', 'Password is required').isLength({min: 6}),
    ]
  }
}
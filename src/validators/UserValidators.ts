import { body } from "express-validator";

export class UserValidators {
  static register (){
    return [ 
      body('name', 'Name is required').isString(),
      body('email', 'Email is required').isEmail(),
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
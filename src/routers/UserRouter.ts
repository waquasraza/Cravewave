import { Router } from "express";
import { UserController } from "../controllers/UserControllers";
import { UserValidators } from "../validators/UserValidators";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";

class UserRouter {

  public router: Router

  constructor(){
    this.router = Router()
    this.getRoutes()
    this.postRoutes()
    this.patchRoutes()
    this.putRoutes()
    this.deleteRoutes()
  }

  getRoutes(){}

  postRoutes(){
    this.router.post('/register', UserValidators.register(), GlobalMiddleware.checkError, UserController.register)
  }

  patchRoutes(){
    this.router.patch('/verify', UserValidators.verifyUserEmail(), GlobalMiddleware.checkError, UserController.verify)
  }

  putRoutes(){}
  
  deleteRoutes(){}

}

export default new UserRouter().router
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'

import { getEviromentVariables } from './environments/environment'
import UserRouter from './routers/UserRouter'

export class Server {
  
  public app: express.Application = express()

  constructor(){
    this.setConfigs()
    this.setRoutes()
    this.error404Handler()
    this.handleErrors()
  }

  setConfigs(){
    this.connectMongoDB()
    this.appMiddlewares()
  }

  connectMongoDB(){
    mongoose.connect(getEviromentVariables().db_uri)
      .then(()=>console.log('MongoDB connected'))
      .catch(e => console.log(e))
  }

  appMiddlewares(){
    this.app.use(bodyParser.json({limit: "100mb"}))
    this.app.use(express.urlencoded({extended: true}))
  }

  setRoutes(){
    this.app.use('/api/user', UserRouter)
  }

  error404Handler(){
    this.app.use((req, res)=>{
      res.status(404).json({
        status_code: 404,
        message: 'Not found'
      })
    })
  }

  handleErrors(){
    this.app.use((err, req, res, next)=>{

      const errorStatus = req.statusCode || 500

      res.status(errorStatus).json({
        status_code: errorStatus,
        message: err.message || 'Something went wrong'
      })
    })
  }
  

}


import { DevEnvironment } from "./environment.dev";
import { ProdEnvironment } from "./environment.prod";

export interface Environment{
  db_uri: string,
  sendgrid_api_key?: string
}

export function getEviromentVariables() {
  if(process.env.Node_ENV == 'production'){
    return ProdEnvironment
  }
  return DevEnvironment
}
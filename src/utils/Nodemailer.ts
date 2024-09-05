import * as nodemailer from 'nodemailer'
import * as Sendgrid from 'nodemailer-sendgrid-transport'
import { getEviromentVariables } from '../environments/environment'
// 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
export class Nodemailer {

  private static initiateTransport(){
    return nodemailer.createTransport(Sendgrid({
      auth: {
        api_key: getEviromentVariables().sendgrid_api_key
      }
    })) 
  }

  static sendmail(data: {to: [string], subject: string, html: string}): Promise<any>{
    return Nodemailer.initiateTransport().sendMail({
      from: 'thewaquas@gmail.com',
      to: data.to,
      subject: data.subject,
      html: data.html
    })
  }

}
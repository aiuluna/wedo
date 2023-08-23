import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
export class Application {
  static inst: Application;

  private app: Express

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(cors())
  }

  public getApp() {
    return this.app
  }

  public listen() {
    this.app.listen(7001)
  }

  static getInstance() {
    if (!Application.inst) {
      Application.inst = new Application()
    }
    return Application.inst
  }
}
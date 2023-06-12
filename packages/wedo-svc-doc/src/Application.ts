import express, { Express } from "express";
import cors from 'cors'
class Application {
  private app: Express;
  static inst: Application;

  private constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())
  }

  public getApp() {
    return this.app
  }

  public listen() {
    this.app.listen(7002)
  }

  static getInstance() {
    if (!Application.inst) {
      Application.inst = new Application()
    }
    return Application.inst
  }
}

export default Application;
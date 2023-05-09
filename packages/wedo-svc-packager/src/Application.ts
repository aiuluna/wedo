import express, { Express } from "express";
import cors from 'cors'
import bodyParser from "body-parser";

export default class Application {
  static inst: Application;
  private app: Express;

  private constructor() {
    this.app = express() 
    this.app.use(bodyParser.json())
    this.app.use(cors({
      origin: ['http://localhost:3001']
    }))
  }

  public listen(port: number) {
    this.app.listen(port)
  }

  public getApp() {
    return this.app
  }

  static getInstance() {
    if (!Application.inst) {
      Application.inst = new Application()
    }
    return Application.inst
  }
}
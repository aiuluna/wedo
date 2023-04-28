import express, { Express } from 'express'

export class Application {
  static inst: Application;

  private app: Express

  constructor() {
    this.app = express()
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
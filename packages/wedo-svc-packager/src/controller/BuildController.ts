import { Request, Response } from "express";
import { Application } from "../Application";
import path from "path";
import fs from 'fs';
import { ProjectBuilder } from '@wedo/code-tools'
import fetch from 'node-fetch'

enum HTTPMethod {
  GET,
  POST,
  PUT,
  DELETE
}

// @ts-ignore
// global.fetch = fetch
export class BuildController {
  constructor() { }

  @restful(HTTPMethod.GET, '/')
  index(req: Request, res: Response) {
    res.send('hello wedo-svc-packager')
  }

  @restful(HTTPMethod.PUT, '/build/:user/:name')
  async build(req: Request, res: Response) {
    const { user, name } = req.params;

    const cwd = path.resolve(__dirname, '../temp')
    console.log('start build...')
    try {
      if (!fs.existsSync(cwd)) {
        fs.mkdirSync(cwd)
      }

      const builder = new ProjectBuilder();
      await builder.build(user, name, cwd);
      res.send({
        success: true
      })
    } catch (error) {
      res.status(500).send('error msg:' + error.toString())
    }
  }
}


function restful(method: HTTPMethod, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const application = Application.getInstance();
    const app = application.getApp()
    switch (method) {
      case HTTPMethod.GET:
        app.get(path, descriptor.value.bind(target))
        break;
      case HTTPMethod.POST:
        app.post(path, descriptor.value.bind(target))
        break;
      case HTTPMethod.PUT:
        app.put(path, descriptor.value.bind(target))
        break;
      default:
        break;
    }
  }
}




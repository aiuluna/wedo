import { Request, Response } from "express";
import Application from "../Application";
import path from "path";
import fs from 'fs';
import { ProjectBuilder } from '@wedo/code-tools'

enum HTTPMethod {
  GET,
  POST,
  PUT,
  DELETE
}

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
    const app = Application.getInstance().getApp()
    const methodsMap = {
      [HTTPMethod.GET]: app.get,
      [HTTPMethod.PUT]: app.put,
      [HTTPMethod.POST]: app.post,
      [HTTPMethod.DELETE]: app.delete,
    };
    const methodHanlder = methodsMap[method];
    if (methodHanlder) {
      methodHanlder.call(app, path, descriptor.value.bind(target))
    }
  }
}


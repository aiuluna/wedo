import { Request, Response } from "express";
import Application from "../Application";
import DocService from "../service/DocService";

enum HTTPMethod {
  GET,
  POST,
  PUT,
  DELETE
}

class DocController {
  @restful(HTTPMethod.GET, '/')
  async index(req: Request, res: Response) {
    console.log('index success')
    res.send('success')
  }

  @restful(HTTPMethod.PUT, '/code-project/:user/:name')
  async saveCodeProjectJSON(req: Request, res: Response) {
    const { user, name } = req.params;
    const values = req.body;
    const service = new DocService();
    const response = await service.saveCodeProject(user, name, values)
    res.send(response)
  }


  @restful(HTTPMethod.GET, '/code-project/:user/:name')
  async getCodeProjectJSON(req: Request, res: Response) {
    const { user, name } = req.params;
    const service = new DocService();
    const response = await service.getCodeProject(user, name)
    res.send(response)
  }

  @restful(HTTPMethod.PUT, '/page/:user/:name')
  async savePage(req: Request, res: Response) {
    const { user, name } = req.params;
    const { url } = req.body;
    const service = new DocService();
    const response = await service.savePage(user, name, url)
    res.send(response)
  }

  @restful(HTTPMethod.GET, '/page/:user/:name')
  async getPage(req: Request, res: Response) {
    const { user, name } = req.params;
    const service = new DocService();
    const response = await service.getPage(user, name)
    res.send(response)
  }
}

function restful(method: HTTPMethod, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const application = Application.getInstance();
    const app = application.getApp();
    switch (method) {
      case HTTPMethod.GET:
        app.get(path, descriptor.value.bind(target))
        break
      case HTTPMethod.PUT:
        app.put(path, descriptor.value.bind(target))
        break
    }
  }
}

export default DocController;